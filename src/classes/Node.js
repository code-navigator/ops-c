import uuidv1 from 'uuid/v1'

export default class Node {
  constructor ({
    id = uuidv1(),
    parentId,
    title = 'New Child',
    children = [],
    open = false,
    readOnly = true,
    requirements = []
  } = {}) {
    this.id = id
    this.parentId = parentId
    this.title = title
    this.children = children
    this.open = open
    this.readOnly = readOnly
    this.requirements = requirements
  }

  addNewNode () {
    this.children = this.children.push(
      new Node()
    )
  }
}
