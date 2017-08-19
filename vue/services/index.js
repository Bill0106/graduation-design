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
        const { data } = response
        if (data.status === 'error') {
          Message.error(data.message)
        }
        return response
      },
      error => {
        console.log(error)
      }
    )
  }

  login(params) {
    return axios.post('/login', params)
  }

  signup(params) {
    return axios.post('/users', params)
  }
}

export default new Services()
