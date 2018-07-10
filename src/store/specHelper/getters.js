import ArrayUtil from '@Classes/arrayUtil'

export default {
  // Sort requirements
  requirements (state) {
    if (state.currentNode.requirements) {
      return ArrayUtil.sortArray(state.currentNode.requirements, 'nodeOrder')
    }
  },

  // Return ID of current node
  currentNodeId (state) {
    return state.currentNode.id
  },

  tabs (state) {
    if (state.tabs) {
      return ArrayUtil.sortArray(state.tabs, 'title')
    }
  }
}
