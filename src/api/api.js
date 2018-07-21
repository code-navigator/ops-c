import axios from 'axios'
import Url from '@Models/Url'

export default {
  // GET - request data
  get (url, request) {
    const path = new Url(url, request)
    return axios.get(path.pathWithQuery)
  },
  // POST - send data
  post (url, request) {
    const path = new Url(url)
    return axios.post(path.path, request)
  },
  // PUT - insert data
  put (url, request) {
    const path = new Url(url)
    return axios.put(path.path, request)
  },
  // PATCH - update data
  patch (url, request) {
    const path = new Url(url)
    return axios.patch(path.path, request)
  },
  // DELETE - delete data
  delete (url, request) {
    const path = new Url(url)
    return axios.delete(path.path, {data: request})
  }
}
