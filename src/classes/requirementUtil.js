import uuidv1 from 'uuid/v1'
import ArrayUtil from '@Classes/arrayUtil'

export default class RequirementUtil {
  // Create unique identifier based on timestamp
  createId () {
    return uuidv1()
  }

  addNewRequirement (node) {
    node.push({
      id: this.createId(),
      nodeId: node.id,
      description: '',
      requirement: '',
      nodeOrder: this.getNextIndex(node.requirements)
    })
  }

  getNextIndex (requirements) {
    const arr = new ArrayUtil()

    return requirements.length > 0
      ? arr.getMax(requirements, 'nodeOrder') + 1 : 1
  }
}
