import uuidv1 from 'uuid/v1'

export default class ArrayUtil {
  // Clone node with all descendants in tree structure
  // by assigning new IDs
  clone (node, parentId) {
    node.id = this.createId()
    node.parentId = parentId

    for (var i = 0; i < node.requirements.length; i++) {
      node.requirements[i].id = this.createId()
      node.requirements[i].nodeId = node.id
    }

    for (var j = 0; j < node.children.length; j++) {
      node.children[j] = this.clone(node.children[j], node.id)
    }

    return node
  }

  // Create unique identifier based on timestamp
  createId () {
    return uuidv1()
  }

  // Add new blank node
  addNewNode (node) {
    node.children.push({
      id: this.createId(),
      parentId: node.id,
      title: 'Added Child',
      children: [],
      requirements: [],
      open: false,
      readOnly: false
    })
  }

  // Remove node and all child nodes from tree structure
  remove (parentNode, id) {
    parentNode.children = parentNode.children
      .filter((child) => { return child.id !== id })
      .map((child) => { return this.remove(child, id) })
    return parentNode
  }

  // Toggle flag to show/hide children nodes
  toggleVisibility (parentNode, state) {
    parentNode.open = state

    for (var i = 0; i < parentNode.children.length; i++) {
      this.toggleVisiblity(parentNode.children[i], state)
    }
  }
}
