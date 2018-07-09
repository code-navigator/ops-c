import axios from 'axios'
import Url from './../classes/urlUtil'

export default {
  get (url, request) {
    const path = new Url(url, request)
    return axios.get(path.pathWithQuery)
  },

  post (url, request) {
    const path = new Url(url)
    return axios.post(path.path, request)
  },

  put (url, request) {
    const path = new Url(url)
    return axios.put(path.path, request)
  },

  patch (url, request) {
    const path = new Url(url)
    return axios.patch(path.path, request)
  },

  delete (url, request) {
    const path = new Url(url)
    return axios.delete(path.path, {data: request})
  }
}
