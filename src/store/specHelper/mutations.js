export default {
  // Add empty node as child to currently selected node
  addNode (state) {
    state.nodes.addNewNode(state.currentNode)
  },

  // Add empty requirement placeholder
  addRequirement (state) {
    state.nodes.addNewRequirement(state.currentNode)
  },

  // Add new tab for viewing document
  addTab (state, tab) {
    state.tabs.push(
      {
        title: tab.title,
        url: tab.url
      }
    )
  },

  // Clear array of deleted requirements
  clearDeletedNodes (state) {
    state.deletedNodes = []
  },

  // Clear array of deleted requirements
  clearDeletedRequirements (state) {
    state.deletedRequirements = []
  },

  // Remove all tabs for viewing documents
  clearTabs (state) {
    state.tabs = []
  },

  // Copy node to another location in tree
  copyInsertNode (state, destNode) {
    state.nodes.insertCopyOfNode(state.currentNode, destNode)
  },

  // Make a copy of the current node
  copyNode (state) {
    state.clippedNode = state.nodes.duplicateNode(state.currentNode)
    state.nodeIsClipped = true
  },

  // Toggle edit mode
  edit (state) {
    state.isEdit = !state.isEdit
  },

  // Get requirements for currently selected node
  getRequirements (state, requirement) {
    state.currentRequirement = requirement
  },

  // Move node to another location in tree
  moveNode (state, destNode) {
    state.nodes.moveNodeToNewLocation(state.currentNode, destNode)
  },

  // Paste a copy of the node (branch) into the tree
  pasteNode (state) {
    state.nodes.pasteInCopyOfNode(state.clippedNode, state.currentNode)
  },

  // Remove currently selected node from tree
  removeNode (state) {
    state.deletedNodes.push(state.currentNode)
    state.nodes.removeNode(state.nodes, state.currentNode.id)
  },

  // Set tree state
  setNodes (state, children) {
    state.nodes.children = children
    state.currentNode = state.nodes
    state.nodes.open = false
  },

  // Set currently selected node
  selectNode (state, node) {
    if (!state.requirementIsEdit) {
      node.requirements = state.currentRequirement
    }
    state.currentNode = node
  },

  // Delete all requirements from list
  removeAllRequirements (state) {
    state.currentNode.requirements.forEach((requirement) => {
      state.deletedRequirements.push(requirement)
    })
    state.currentNode.requirements = []
  },

  // Delete requirement from list
  removeRequirement (state) {
    state.deletedRequirements.push(state.currentRequirement)
    state.nodes.removeRequirement(state.currentNode, state.currentRequirement)
  },

  // Reorder requirements
  reorderRequirements (state, data) {
    state.nodes.reorderRequirements(state.currentNode, data)
  },

  // Set currently selected requirement
  selectRequirement (state, requirement) {
    state.currentRequirement = requirement
  },

  // Set currently selected  tab
  setActiveTab (state, activeTab) {
    state.activeTab = activeTab
  },

  // Toggle node state
  toggleNode (state, isVisible) {
    state.nodes.toggleVisibility(state.currentNode, isVisible)
  }
}
