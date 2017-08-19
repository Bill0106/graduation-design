import axios from 'axios'

class Services {
  constructor() {
    axios.defaults.baseURL = '/api'
  }

  login(params) {
    return axios.post('/login', params)
  }
}

export default new Services()
