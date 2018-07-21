const API_URL = `http://localhost:3000/`

export default class Url {
  constructor (subRoute, params) {
    this.params = params
    this.subRoute = subRoute
    this.path = this.getPath()
    this.query = this.getQuery()
    this.pathWithQuery = this.getPathWithQuery()
  }

  // Params contains parameters as key:value pairs
  // This method converts the parameters to a string
  getQuery () {
    let query = ''
    let params = this.params

    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          if (!query) {
            query = '?' + key + '=' + params[key]
          } else {
            query = query + '&' + key + '=' + params[key]
          }
        }
      }
    }

    return query
  }

  // Returns URL without query string
  getPath () {
    let subRoute = this.subRoute ? this.subRoute : ''
    return API_URL + subRoute
  }

  // Returns URL with query string
  getPathWithQuery () {
    let query = this.query ? this.query : ''
    return this.getPath() + query
  }
}
