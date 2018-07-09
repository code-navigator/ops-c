export default class ObjectUtil {
  constructor (obj) {
    this.obj = obj
  }

  // Check if object has properties
  isEmpty () {
    let result = true

    for (var prop in this.obj) {
      if (prop) {
        result = false
      }
    }

    return result
  }

  // Deep clone object
  clone () {
    return JSON.parse(JSON.stringify(this.obj))
  }
}
