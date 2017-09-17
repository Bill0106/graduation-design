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

  getUsers() {
    return axios.get('/users')
  }

  changeUserRole(id, role) {
    return axios.post(`/users/${id}/update-role`, { role })
  }

  getUserRoles() {
    return axios.get('/user-roles')
  }

  createUserRole(userRole) {
    return axios.post('/user-roles', userRole)
  }

  updateUserRole(id, userRole) {
    return axios.post(`/user-roles/${id}`, userRole)
  }

  deleteUserRole(id) {
    return axios.post(`/user-roles/${id}/remove`)
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

  getCodes(params) {
    const { limit, page } = params
    return axios.get(`/codes?limit=${limit}&page=${page}`)
  }

  getCode(id) {
    return axios.get(`/codes/${id}`)
  }

  createCode(code) {
    return axios.post('/codes', code)
  }

  getComments(params) {
    const { limit, page, codeId } = params
    return axios.get(`/comments?codeId=${codeId}&limit=${limit}&page=${page}`)
  }

  createComment(comment) {
    return axios.post('/comments', comment)
  }
}

export default new Services()
