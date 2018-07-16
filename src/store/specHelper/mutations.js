import Node from '@Models/Node'
import Requirement from '@Models/Requirement'
import Tab from '@Models/Tab'
import uuidv1 from 'uuid/v1'

// Recursive function for cloning nodes
const cloneNode = (node, parentId) => {
  node.id = uuidv1()
  node.parentId = parentId

  // Clone requirements
  for (var i = 0; i < node.requirements.length; i++) {
    node.requirements[i].id = uuidv1()
    node.requirements[i].nodeId = node.id
  }

  // Clone child nodes
  for (var j = 0; j < node.children.length; j++) {
    node.children[j] = this.cloneNode(node.children[j], node.id)
  }

  return node
}

// Create a new object pointer
const duplicateNode = (node) => {
  return JSON.parse(JSON.stringify(node))
}

// Find array index that matches requirement id
const getIndexOfMatchingRequirementId = (requirements, id) => {
  return requirements
    .map((requirement) => { return requirement['id'] })
    .indexOf(id)
}

// Get the maximum requirement order number
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
  // Add empty node as child to currently selected node
  addNode (state) {
    state.currentNode.children.push(
      new Node()
    )
  },

  // Add empty requirement placeholder
  addRequirement (state) {
    state.currentNode.requirements.push(
      new Requirement(
        {
          // Attach to current node
          nodeId: state.currentNode.id,
          // Set order to next highest number
          nodeOrder: maxOrder(state.currentNode.requirements)
        }
      )
    )
  },

  // Add new tab for viewing document
  addTab (state, tab) {
    state.tabs.push(
      new Tab(tab.title, tab.url)
    )
  },

  // Clear array of deleted nodes
  clearDeletedNodes (state) {
    state.deletedNodes.length = 0
  },

  // Clear array of deleted requirements
  clearDeletedRequirements (state) {
    state.deletedRequirements.length = 0
  },

  // Remove all tabs for viewing documents
  clearTabs (state) {
    state.tabs.length = 0
  },

  // Make a copy of the current node
  copyNode (state) {
    state.clippedNode = duplicateNode(state.currentNode)
    state.nodeIsClipped = true
  },

  // Copy node to another location in tree
  copyNodeToNewLocation (state, destNode) {
    // Get a clean copy of the current node
    let copyOfNode = duplicateNode(state.currentNode)
    // Clone it
    copyOfNode = cloneNode(copyOfNode, copyOfNode.parentId)
    // Attach it the destination node
    destNode.children.push(copyOfNode)
  },

  // Toggle edit mode
  edit (state) {
    state.isEdit = !state.isEdit
  },

  // Get requirements for currently selected node
  getRequirements (state, requirements) {
    state.currentRequirement = requirements
  },

  // Move node to another location in tree
  moveNodeToNewLocation (state, destNode) {
    // Get a clean copy of the current node
    let copyOfNode = duplicateNode(state.currentNode)
    // Change its parent ID
    copyOfNode.parentId = destNode.id
    // Attach the node to its new parent
    destNode.children.push(copyOfNode)
  },

  // Paste a copy of the node (branch) into the tree
  pasteInCopyOfNode (state) {
    let copyOfNode = cloneNode(state.clippedNode, state.currentNode.id)
    state.currentNode.children.push(copyOfNode)
  },

  // Remove currently selected node from tree
  removeNode (state) {
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
    state.deletedNodes.push(state.currentNode)
    // Call function to remove selected node
    removeNode(state.nodes, state.currentNode.id)
  },

  // Delete requirement from list
  removeRequirement (state) {
    // Add to the list of requirements to be deleted
    state.deletedRequirements.push(state.currentRequirement)
    // Find the requirement and delete it (ie., return all the other requirements)
    state.currentNode.requirements = state.currentNode.requirements
      .filter((requirement) => {
        // Filter out the one requirement
        return requirement.id !== state.currentRequirement.id
      })
  },

  // Delete all requirements from list
  removeAllRequirements (state) {
    // Add requirements to the list of deleted requirements
    state.currentNode.requirements.forEach((requirement) => {
      state.deletedRequirements.push(requirement)
    })

    // Empty requirements array
    state.currentNode.requirements.length = 0
  },

  // Reorder requirements (drag and drop)
  reorderRequirements (state, data) {
    // Get position within requirements array for the original location and the new location
    const pos1 = getIndexOfMatchingRequirementId(state.currentNode.requirements, data.source.id)
    const pos2 = getIndexOfMatchingRequirementId(state.currentNode.requirements, data.destination.id)

    // Swap orders to change sort order
    const temp = state.currentNode.requirements[pos1].nodeOrder
    state.currentNode.requirements[pos1].nodeOrder = state.currentNode.requirements[pos2].nodeOrder
    state.currentNode.requirements[pos2].nodeOrder = temp
  },

  // Set currently selected node
  selectNode (state, node) {
    if (!state.requirementIsEdit) {
      // Display requirements from server if not in edit mode
      node.requirements = state.currentRequirement
    }
    state.currentNode = node
  },

  // Set currently selected requirement
  selectRequirement (state, requirement) {
    state.currentRequirement = requirement
  },

  // Set currently selected  tab
  setActiveTab (state, activeTab) {
    state.activeTab = activeTab
  },

  // Set tree state
  setNodes (state, children) {
    state.nodes.children = children
    state.currentNode = state.nodes
  },

  // Toggle node state
  toggleNode (state, isVisible) {
    state.currentNode.open = isVisible
    // Toggle on/off the visibility of all the nodes beneath the current one
    for (var i = 0; i < state.currentNode.children.length; i++) {
      state.currentNode.children[i].open = isVisible
    }
  }
}
