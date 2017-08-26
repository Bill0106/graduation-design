import axios from 'axios'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'

class Services {
  constructor() {
    const token = Cookie.get('token')

    if (token) {
      axios.defaults.headers.common['X-TOKEN'] = token
    }
    axios.defaults.baseURL = '/api'
    axios.interceptors.response.use(
      response => {
        const { data, config } = response
        if (data.status === 'error' && config.url !== '/api/check-user') {
          Message.error(data.message)
        }
        return response
      },
      error => {
        console.log(error)
      }
    )
  }

  getUsers() {
    return axios.get('/users')
  }

  signup(params) {
    return axios.post('/users', params)
  }

  login(params) {
    return axios.post('/login', params)
  }

  logout() {
    return axios.post('/logout')
  }

  checkUser() {
    return axios.post('/check-user')
  }

  getCodeTypes() {
    return axios.get('/code-types')
  }

  createCodeType(codeType) {
    return axios.post('/code-types', codeType)
  }

  updateCodeType(id, codeType) {
    return axios.post(`/code-types/${id}`, codeType)
  }

  deleteCodeType(id) {
    return axios.post(`/code-types/${id}/remove`)
  }
}

export default new Services()
