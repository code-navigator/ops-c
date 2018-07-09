import ArrayUtil from '@Classes/arrayUtil'
import NodeUtil from '@Classes/nodeUtil'

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
    state.tabs.addNewTab(tab)
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
    state.clippedNode = state.nodes.duplicateNode()
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

  // Open current node
  openNode (state) {
    state.currentNode.open = true
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
    state.currentNode.requirements = state.currentNode.requirements
      .filter((requirement) => {
        return requirement.id !== state.currentRequirement.id
      })
  },

  // Reorder requirements
  reorderRequirements (state, data) {
    const arr = new ArrayUtil()

    // Get position within requirements array
    var pos1 = arr.getIndexOfMatchingElement(state.currentNode.requirements, 'id', data.source.id)
    var pos2 = arr.getIndexOfMatchingElement(state.currentNode.requirements, 'id', data.destination.id)
    console.log(pos1)
    // Swap orders to change sort order
    var temp = state.currentNode.requirements[pos1].nodeOrder
    state.currentNode.requirements[pos1].nodeOrder = state.currentNode.requirements[pos2].nodeOrder
    state.currentNode.requirements[pos2].nodeOrder = temp
  },

  // Set currently selected requirement
  selectRequirement (state, data) {
    state.currentRequirement = data
  },

  // Toggle node state
  toggleNode (state, data) {
    const node = new NodeUtil()

    if (state.currentNode.children) {
      node.toggleVisibility(state.currentNode, data)
    }
  }
}
