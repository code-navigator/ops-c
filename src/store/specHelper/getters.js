import ArrayUtil from '@Classes/arrayUtil'

export default {
  // Sort requirements
  requirements (state) {
    if (state.currentNode.requirements) {
      const arr = new ArrayUtil()
      return arr.sortArray(state.currentNode.requirements, 'nodeOrder')
    }
  },

  // Return ID of current node
  currentNodeId (state) {
    return state.currentNode.id
  }
}
