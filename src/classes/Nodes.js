import ArrayUtil from '@Classes/arrayUtil'
import Node from '@Classes/Node'
import Requirement from '@Classes/Requirement'
import uuidv1 from 'uuid/v1'

export default class Nodes {
  constructor (
    id = '0',
    title = 'Root',
    children = [],
    open = false,
    readOnly = true,
    requirements = []
  ) {
    this.id = id
    this.title = title
    this.children = children
    this.open = open
    this.readOnly = readOnly
    this.requirements = requirements
  }

  addNewNode (node) {
    node.children.push(
      new Node()
    )
  }

  addNewRequirement (node) {
    node.requirements.push(
      new Requirement({
        nodeId: node.id,
        nodeOrder: this.getRequirementIndex(node.requirements)
      })
    )
  }

  cloneNode (node, parentId) {
    node.id = uuidv1()
    node.parentId = parentId

    for (var i = 0; i < node.requirements.length; i++) {
      node.requirements[i].id = uuidv1()
      node.requirements[i].nodeId = node.id
    }

    for (var j = 0; j < node.children.length; j++) {
      node.children[j] = this.cloneNode(node.children[j], node.id)
    }

    return node
  }

  duplicateNode (node) {
    return JSON.parse(JSON.stringify(node))
  }

  getRequirementIndex (requirements) {
    const arr = new ArrayUtil()

    return requirements.length > 0
      ? arr.getMax(requirements, 'nodeOrder') + 1 : 1
  }

  getIndexOfMatchingElement (arr, key, val) {
    return arr
      .map((element) => { return element[key] })
      .indexOf(val)
  }

  insertCopyOfNode (srcNode, destNode) {
    let copyOfNode = this.duplicateNode(srcNode)
    copyOfNode = this.cloneNode(copyOfNode, copyOfNode.parentId)
    destNode.children.push(copyOfNode)
  }

  moveNodeToNewLocation (srcNode, destNode) {
    let copyOfNode = this.duplicateNode(srcNode)
    copyOfNode.parentId = destNode.id
    destNode.children.push(copyOfNode)
  }

  pasteInCopyOfNode (srcNode, destNode) {
    let copyOfNode = this.duplicateNode(srcNode)
    copyOfNode = this.cloneNode(copyOfNode, destNode.id)
    destNode.children.push(copyOfNode)
  }

  removeNode (parentNode, id) {
    parentNode.children = parentNode.children
      .filter((child) => { return child.id !== id })
      .map((child) => { return this.removeNode(child, id) })
    return parentNode
  }

  removeRequirement (currentNode, currentRequirement) {
    currentNode.requirements = currentNode.requirements
      .filter((requirement) => {
        return requirement.id !== currentRequirement.id
      })
  }

  reorderRequirements (currentNode, data) {
    // Get position within requirements array
    const pos1 = this.getIndexOfMatchingElement(currentNode.requirements, 'id', data.source.id)
    const pos2 = this.getIndexOfMatchingElement(currentNode.requirements, 'id', data.destination.id)
    // Swap orders to change sort order
    const temp = currentNode.requirements[pos1].nodeOrder
    currentNode.requirements[pos1].nodeOrder = currentNode.requirements[pos2].nodeOrder
    currentNode.requirements[pos2].nodeOrder = temp
  }

  toggleVisibility (parentNode, isVisible) {
    parentNode.open = isVisible

    for (var i = 0; i < parentNode.children.length; i++) {
      this.toggleVisibility(parentNode.children[i], isVisible)
    }
  }
}
