import api from '@Api/api'
import Node from '@Models/Node'
import Requirement from '@Models/Requirement'
import Tab from '@Models/Tab'
import uuidv1 from 'uuid/v1'

const API_URL = 'http://localhost:3000/spechelper/'
let debounce = false

// Recursive function for cloning nodes
const cloneNode = (node, parentId) => {
  // Create unique ID and set parent ID
  node.id = uuidv1()
  node.parentId = parentId

  // Clone requirements
  for (var i = 0; i < node.requirements.length; i++) {
    node.requirements[i].id = uuidv1()
    node.requirements[i].nodeId = node.id
  }

  // Clone child nodes
  for (var j = 0; j < node.children.length; j++) {
    node.children[j] = cloneNode(node.children[j], node.id)
  }

  return node
}

// Create a new object pointer (ie, copy object by value)
const duplicateNode = (node) => {
  return JSON.parse(JSON.stringify(node))
}

// Find array index that matches requirement id
const getIndexOfMatchingRequirementId = (requirements, id) => {
  return requirements
    .map((requirement) => { return requirement['id'] })
    .indexOf(id)
}

// Get the next line number in the requirements table
const maxOrder = (requirements) => {
  return requirements.length > 0
    // Find last item and increment order by one
    ? requirements
      .reduce((max, requirement) =>
        requirement['nodeOrder'] > max
          ? requirement['nodeOrder']
          : max, requirements[0]['nodeOrder']) + 1
    // Return 1 for the first item
    : 1
}

export default {
  // Add new node to the tree
  addNode ({commit, state}) {
    commit('addNode',
      {
        node: new Node({parentId: state.currentNode.id})
      }
    )
  },

  // Add a requirement to the current node
  addRequirement ({commit, state}) {
    commit('addRequirement',
      {
        requirement: new Requirement(
          {
            // Attach to current node
            nodeId: state.currentNode.id,
            // Set order to next highest number
            nodeOrder: maxOrder(state.currentNode.requirements)
          }
        )
      }
    )
  },

  // Cancel edit and discard changes
  cancelEdit ({dispatch, state}) {
    // Toggle off edit mode
    dispatch('edit')
    // Reload tree (nodes and requirements)
    dispatch('getNodes')
    dispatch('getRequirements', state.nodes)
  },

  // Make a copy of the current node
  copyNode ({commit}) {
    // Clip the node
    commit('setClippedNode')
    // And set the flag
    commit('setIsClipped', true)
  },

  // Copy node in tree
  copyNodeToNewLocation ({commit, state}, dest) {
    // Get a clean copy of the current node
    let copyOfNode = duplicateNode(state.currentNode)
    // Clone it
    copyOfNode = cloneNode(copyOfNode, dest.id)
    // Attach to new destination
    commit('setNode', {dest: dest, node: copyOfNode})
  },

  // Cut out node (i.e., make a copy and remove the original node)
  cutNode ({dispatch}) {
    dispatch('copyNode')
    dispatch('removeNode')
  },

  // Toggle the node edit mode
  // Called after a save or cancel operation
  edit ({commit, dispatch, state}) {
    // Clear arrays containing deleted nodes and deleted requirements
    commit('clearDeletedNodes')
    commit('clearDeletedRequirements')
    // Turn off expanded requirements
    commit('setIsExpanded', false)
    dispatch('getRequirements', state.currentNode)
    // Set edit mode after getting requirements
    commit('setIsEdit', !state.isEdit)
  },

  // Pull in requirements for current node and all ancestor nodes
  async expandRequirements ({commit, dispatch, state}) {
    // Toggle flag for expanding requirements to include parent nodes
    commit('setIsExpanded', !state.isExpanded)

    // Expand requirement only when edit mode is false
    if (!state.isEdit && state.isExpanded) {
      // Get requirements for current node and its ancestors
      let requirements = await api.get(
        state.moduleName + '/requirements/all',
        {id: state.currentNode.id}
      )
      commit('setRequirements', requirements.data)
      // Retrieve documents
      dispatch('loadDocs')
    } else {
      dispatch('getRequirements', state.currentNode )
      dispatch('loadDocs')
    }
  },

  // Get nodes to display in tree (complete reset)
  async getNodes ({commit, state}) {
    var nodes = await api.get(state.moduleName + '/nodes')
    commit('setNodes', nodes.data)
    commit('setCurrentNode', state.nodes)
  },

  // Get requirements for currently selected node
  async getRequirements ({commit, dispatch, state}, data) {
    // Do not overwrite requirements if edit mode is active
    if (!state.isExpanded && (!state.isEdit ||
      (state.isEdit && state.currentNode.requirements.length === 0))) {
      // Get requirements for current node only
      var requirements = await api.get(
        state.moduleName + '/requirements',
        {id: data.id}
      )
      // Add requirements to displayed list
      commit('setRequirements', requirements.data)
    } else {
      // Reload existing requirements but do not overwrite
      commit('setRequirements', data.requirements)
    }

    // Retrieve documents
    dispatch('loadDocs')
  },

  // Load procedures and specifications
  loadDocs ({commit, dispatch, state}) {
    // Clear existing tabs
    commit('clearTabs')
    commit('setActiveTab', 0)
    if (state.currentNode.requirements &&
        state.currentNode.requirements.length > 0) {
      // Load specs from list of requirements
      dispatch('loadSpecs')
      // Load procedures from list of requirements
      dispatch('loadProcs')
      // Sort tabs
      dispatch('sortTabs')
    }
  },

  // Load procedures associated with currently selected node
  async loadProcs ({commit, state}) {
    // Filter requirements to include only those with a description of PROC
    let procs = await state.currentNode.requirements.filter(requirement => {
      return requirement.description === 'PROC'
    })

    // Create a tab for each PROC in the list
    procs.forEach(async (doc) => {
      let title = {title: doc.requirement}
      var result = await api.get(state.moduleName + '/loadprocs', title)
      commit('addTab', new Tab(
        title.title,
        API_URL + '/loadprocs/' + result.data
      ))
    })
  },

  // Load specifications associated with currently selected node
  async loadSpecs ({commit, state}) {
    // Filter requirements to include only those with a description of SPEC
    let specs = await state.currentNode.requirements.filter(requirement => {
      return requirement.description === 'SPEC'
    })

    // Create a tab for each SPEC in the list
    specs.forEach(async (doc) => {
      let title = {title: doc.requirement}
      var result = await api.get(state.moduleName + '/loadspecs', title)

      commit('addTab', new Tab(
        title.title,
        API_URL + '/loadspecs/' + result.data
      ))
    })
  },

  // Move node in tree
  moveNodeToNewLocation ({commit, dispatch, state}, dest) {
    // Get a clean copy of the current node
    let copyOfNode = duplicateNode(state.currentNode)
    // Clone node and change its parent ID to point to its new parent
    copyOfNode = cloneNode(copyOfNode, dest.id)
    // Attach the node to its new parent
    commit('setNode', {dest: dest, node: copyOfNode})
    // Then, remove it from its original location
    dispatch('removeNode')
  },

  // Open tab linked to current requirement
  openTab ({commit, state}, title) {
    let tab = state.tabs.map((item) => { return item['title'] })
      .indexOf(title) + 1
    commit('setActiveTab', tab)
  },

  // Paste copy of node at current location
  pasteInCopyOfNode ({commit, state}) {
    // Get a clean copy of the node copy
    let copyOfNode = duplicateNode(state.clippedNode)
    // Clone node and change its parent ID to point to its new parent (selected node)
    copyOfNode = cloneNode(copyOfNode, state.currentNode.id)
    // Attach node
    commit('setNode', {node: copyOfNode})
  },

  // Remove all requirements attached to current Node
  removeAllRequirements ({commit, state}) {
    // Add requirements to the list of deleted requirements
    state.currentNode.requirements.forEach((requirement) => {
      commit('deleteRequirement', requirement)
    })
    // Empty requirements array
    commit('clearRequirements')
  },

  // Remove a node from the tree
  removeNode ({commit, state}) {
    // Function to remove node
    const removeNode = (parentNode, id) => {
      parentNode.children = parentNode.children
        // Return array with all children except for the one being removed
        .filter((child) => { return child.id !== id })
        // Repeat for each child, grandchild, ...
        .map((child) => { return removeNode(child, id) })
      return parentNode
    }
    // Add node to list of nodes being deleted during the current edit session
    commit('deleteNode')
    // Call function to remove selected node recursively
    removeNode(state.nodes, state.currentNode.id)
  },

  // Remove a requirement from the current node
  removeRequirement ({commit, state}) {
    // Add to the list of requirements to be deleted
    commit('deleteRequirement', state.currentRequirement)

    // Find the requirement and delete it (ie., return all the other requirements)
    let requirements = state.currentNode.requirements
      .filter((requirement) => {
        // Filter out the one requirement with matching ID
        return requirement.id !== state.currentRequirement.id
      })
    // Set requirements array to contain the non-matching elements
    commit('setRequirements', requirements)
  },

  // Change requirement's position in the list
  reorderRequirements ({commit, state}, data) {
    // Get position within requirements array for the original location and the new location
    const pos1 = getIndexOfMatchingRequirementId(state.currentNode.requirements, data.source.id)
    const pos2 = getIndexOfMatchingRequirementId(state.currentNode.requirements, data.destination.id)

    // Get references to the requirements being swapped
    const src = state.currentNode.requirements[pos1]
    const dest = state.currentNode.requirements[pos2]

    // Swap orders to change sort order
    const temp = src.nodeOrder
    commit('setRequirementOrder', {req: src, order: dest.nodeOrder})
    commit('setRequirementOrder', {req: dest, order: temp})
  },

  // Persist changes to the database
  async save ({state, commit, dispatch}) {
    // Insert changes to database
    await api.put(state.moduleName + '/nodes', state.nodes.children)
    // Remove deleted nodes from database
    await api.delete(state.moduleName + '/nodes', state.deletedNodes)
    // Remove deleted requirements from database
    await api.delete(state.moduleName + '/requirements', state.deletedRequirements)
    // Toggle edit mode
    dispatch('edit')
  },

  // Set currently selected node
  selectNode ({ commit, dispatch, state }, node) {
    if (!debounce) {
      debounce = true
      // Turn off expanded mode when changing nodes
      commit('setIsExpanded', false)
      if (node !== state.currentNode) {
        // Select requirements for active node only before changing nodes
        dispatch('getRequirements', state.currentNode)
      }
      // Set reference to selected node
      commit('setCurrentNode', node)
      // Remove any tabs associated with previous node
      commit('clearTabs')
      // Set active tab to first tab (tab no. 0)
      commit('setActiveTab', 0)
      // Display requirements for currently selected node
      dispatch('getRequirements', node)
      setTimeout(() => { debounce = false }, 500)
    }
  },

  // Set currently selected requirement
  selectRequirement ({commit}, requirement) {
    commit('selectRequirement', requirement)
  },

  // Set index to selected tab
  setActiveTab ({commit}, tab) {
    commit('setActiveTab', tab)
  },

  // Sort tabs alphabetically
  sortTabs ({commit, state}, activeTab) {
    let tabs = state.tabs.sort((tab1, tab2) => {
      if (tab1['title'] < tab2['title']) {
        return -1
      }
      if (tab1['title'] > tab2['title']) {
        return 1
      }
      return 0
    })

    // Save tabs in new order
    commit('setTabs', tabs)
  },

  // Toggle Nodes to show children
  toggleNode ({commit, state}, isVisible) {
    // Toggle on/off the visibility of all child nodes
    const toggleNode = (parentNode, isVisible) => {
      // Toggle parent node
      commit('setIsOpen', {node: parentNode, value: isVisible})

      // Toggle all descendants of the parent node
      for (var i = 0; i < parentNode.children.length; i++) {
        toggleNode(parentNode.children[i], isVisible)
      }
    }

    // Start toggling node visibility recursively
    toggleNode(state.currentNode, isVisible)
  }
}
