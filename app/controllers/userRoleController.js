const UserRoles = require('../models/UserRoles')

const controller = {
  list: (req, res) => {},
  find: (req, res) => {},
  create: async (req, res) => {
    try {
      const { role, roleName } = req.body
      await UserRoles.create({ role, roleName })
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
