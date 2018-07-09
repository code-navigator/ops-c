export default class ArrayUtil {
  hasKey (arr, key) {
    return (arr &&
      Array.isArray(arr) &&
      arr.length > 0 &&
      arr[0].hasOwnProperty(key)
    )
  }

  getMax (arr, key) {
    return arr
      .reduce((max, obj) => obj[key] > max ? obj[key] : max, arr[0][key])
  }

  // Return array index with matching ID
  getIndexOfMatchingElement (arr, key, val) {
    return arr
      .map((element) => { return element[key] })
      .indexOf(val)
  }

  // Sort array elements using key
  sortArray (arr, key) {
    return arr.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1
      }
      if (a[key] < b[key]) {
        return 1
      }
      return 0
    })
  }
}
