export default {
  // Add empty node as child to currently selected node
  addNode (state, {dest = state.currentNode, node}) {
    dest.children.push(node)
  },

  // Add empty requirement placeholder
  addRequirement (state, {dest = state.currentNode, requirement}) {
    dest.requirements.push(requirement)
  },

  // Add new tab for viewing document
  addTab (state, tab) {
    state.tabs.push(tab)
  },

  // Clear array of deleted nodes
  clearDeletedNodes (state) {
    state.deletedNodes.length = 0
  },

  // Clear array of deleted requirements
  clearDeletedRequirements (state) {
    state.deletedRequirements.length = 0
  },

  // Clear array of requirements
  clearRequirements (state) {
    state.currentNode.requirements.length = 0
  },

  // Remove all tabs for viewing documents
  clearTabs (state) {
    state.tabs.length = 0
  },

  deleteRequirement (state, requirement) {
    state.deletedRequirements.push(requirement)
  },

  deleteNode (state, node = state.currentNode) {
    state.deletedRequirements.push(node)
  },

  // Set currently selected requirement
  selectRequirement (state, requirement) {
    state.currentRequirement = requirement
  },

  // Set currently selected  tab
  setActiveTab (state, tab) {
    state.activeTab = tab
  },

  setClippedNode (state, node = state.currentNode) {
    state.clippedNode = node
  },

  setCurrentNode (state, node) {
    state.currentNode = node
  },

  setIsClipped (state, value) {
    state.isClipped = value
  },

  setIsEdit (state, value) {
    state.isEdit = value
  },

  setIsExpanded (state, value) {
    state.isExpanded = value
  },

  setIsOpen (state, {node, value}) {
    node.open = value
  },

  // Attach node
  setNode (state, {dest = state.currentNode, node}) {
    dest.children.push(node)
  },

  // Set tree state
  setNodes (state, children) {
    state.nodes.children = children
  },

  setRequirementOrder (state, {req, order}) {
    req.nodeOrder = order
  },

  // Get requirements for currently selected node
  setRequirements (state, requirements) {
    state.currentNode.requirements = requirements
  },

  setTabs (state, tabs) {
    state.tabs = tabs
  }
}
