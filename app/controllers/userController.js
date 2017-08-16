const Users = require('../models/Users')
const UserRoles = require('../models/UserRoles')

const controller = {
  list: (req, res) => {},
  find: (req, res) => {},
  create: async (req, res) => {
    try {
      const { username, email, password } = req.body
      const user = await UserRoles.findOne({ role: 'USER' })
      await Users.create({ username, email, password, userRoleId: user._id })
      res.send({
        status: 'success',
        message: null
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },
  update: (req, res) => {},
  remove: (req, res) => {}
}

module.exports = controller
