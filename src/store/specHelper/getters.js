// Sort array of objects by a key property
const sortArray = (arr, key) => {
  // Iterate and compare current object to next object in array
  return arr.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  })
}

export default {
  // Return ID of current node
  currentNodeId (state) {
    return state.currentNode.id
  },

  // Return ID of current requirement
  currentRequirementId (state) {
    return state.currentRequirement.id
  },

  // Return sorted array of requirements
  requirements (state) {
    if (state.currentNode.requirements &&
        state.currentNode.requirements.length > 0) {
      return sortArray(state.currentNode.requirements, 'nodeOrder')
    }
  }
}
