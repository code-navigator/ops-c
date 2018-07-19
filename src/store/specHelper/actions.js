import api from '@Api/api'
import Node from '@Models/Node'
import Requirement from '@Models/Requirement'
import Tab from '@Models/Tab'

const BASE_URL = 'http://localhost:3000/spechelper/'

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
  cancelEdit ({state, dispatch}) {
    // Reload requirements for currently selected node
    dispatch('getNodes')
    dispatch('getRequirements', state.currentNode)
    // Toggle off edit mode
    dispatch('edit')
  },

  // Make a copy of the current node
  copyNode ({commit}) {
    commit('copyNode')
  },

  // Copy node in tree
  copyNodeToNewLocation ({commit}, data) {
    commit('copyNodeToNewLocation', data)
  },

  // Cut out node (i.e., make a copy and remove the original node)
  cutNode ({dispatch}) {
    dispatch('copyNode')
    dispatch('removeNode')
  },

  // Toggle the node edit mode
  // Called after a save or cancel operation
  edit ({commit}) {
    commit('toggleEdit')
    // Clear array containing deleted nodes and requirements
    commit('clearDeletedNodes')
    commit('clearDeletedRequirements')
  },

  async expandRequirements ({state, commit, dispatch}) {
    commit('toggleExpandedRequirements')
    if (!state.isEdit && state.isExpandedRequirements) {
      // Get requirements for current node and its ancestors
      var requirements = await api.get(state.moduleName + '/requirements/all', {id: state.currentNode.id})
      commit('clearTabs')
      commit('getRequirements', requirements.data)
    } else {
      // Get requirements for current node only
      dispatch('getRequirements', state.currentNode)
    }

    // Remove any tabs associated with previous node
    commit('clearTabs')
    console.log(state.currentNode)
    // Load specs from list of requirements
    dispatch('loadSpecs', state.currentNode)
    // Load procedures from list of requirements
    dispatch('loadProcs', state.currentNode)
    // Set active tab to first tab (tab no. 0)
    commit('setActiveTab', 0)
  },

  // Get nodes to display in tree
  async getNodes ({state, commit}) {
    var nodes = await api.get(state.moduleName + '/nodes')
    commit('setNodes', nodes.data)
  },

  // Get requirements for currently selected node
  async getRequirements ({state, commit}, data) {
    if (!state.isEdit) {
      // Do not query database if editting, as this will overwrite changes.
      var requirements = await api.get(state.moduleName + '/requirements', {id: data.id})
      // Add requirements to displayed list
      commit('clearRequirements')
      commit('getRequirements', requirements.data)
    } else {
      commit('getRequirements', data.requirements)
    }
  },

  // Load procedures associated with currently selected node
  async loadProcs ({state, commit}, currentNode) {
    let procs = currentNode.requirements.filter(requirement => {
      return requirement.description === 'PROC'
    })

    procs.forEach(async (element) => {
      let title = {title: element.requirement}
      var result = await api.get(state.moduleName + '/loadprocs', title)

      commit('addTab', new Tab(
        title.title,
        BASE_URL + '/loadprocs/' + result.data
      ))
      commit('sortTabs')
    })
  },

  // Load specifications associated with currently selected node
  async loadSpecs ({state, commit}, currentNode) {
    let specs = currentNode.requirements.filter(requirement => {
      return requirement.description === 'SPEC'
    })

    specs.forEach(async (element) => {
      let title = {title: element.requirement}
      var result = await api.get(state.moduleName + '/loadspecs', title)

      commit('addTab', new Tab(
        title.title,
        BASE_URL + '/loadprocs/' + result.data
      ))
      commit('sortTabs')
    })
  },

  // Move node in tree
  moveNodeToNewLocation ({commit, dispatch}, data) {
    // First move it to its new location
    commit('moveNodeToNewLocation', data)
    // Then, remove it from its original location
    dispatch('removeNode')
  },

  // Open tab linked to current requirement
  openTab ({state, commit}, title) {
    let tab = state.tabs.map((item) => { return item['title'] })
      .indexOf(title) + 1
    commit('setActiveTab', tab)
  },

  // Paste copy of node at current location
  pasteInCopyOfNode ({commit}) {
    commit('pasteInCopyOfNode')
  },

  // Remove all requirements attached to current Node
  removeAllRequirements ({commit}) {
    commit('removeAllRequirements')
  },

  // Remove a node from the tree
  removeNode ({commit}) {
    commit('removeNode')
  },

  // Remove a requirement from the current node
  removeRequirement ({commit}) {
    commit('removeRequirement')
  },

  // Change requirement's position in the list
  reorderRequirements ({commit}, data) {
    commit('reorderRequirements', data)
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
  async selectNode ({ commit, dispatch }, data) {
    // Remove any tabs associated with previous node
    commit('clearTabs')
    // Display requirements for currently selected node
    await dispatch('getRequirements', data)
    commit('selectNode', data)
    // Load specs from list of requirements
    dispatch('loadSpecs', data)
    // Load procedures from list of requirements
    dispatch('loadProcs', data)
    // Set active tab to first tab (tab no. 0)
    commit('setActiveTab', 0)
  },

  // Set currently selected requirement
  selectRequirement ({commit, dispatch}, data) {
    commit('selectRequirement', data)
  },

  setActiveTab ({commit}, activeTab) {
    commit('setActiveTab', activeTab)
  },

  // Toggle Nodes to show children
  toggleNode ({commit}, data) {
    commit('toggleNode', data)
  }
}
