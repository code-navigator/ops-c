import uuidv1 from 'uuid/v1'

export default class Requirement {
  constructor ({
    id = uuidv1(),
    nodeId = '',
    description = '',
    requirement = '',
    nodeOrder = 0
  } = {}) {
    this.id = id
    this.nodeId = nodeId
    this.description = description
    this.requirement = requirement
    this.nodeOrder = nodeOrder
  }
}
