const Users = require('../models/Users')
const UserRoles = require('../models/UserRoles')

const controller = {
  list: async (req, res) => {},
  find: async (req, res) => {
    try {
      const { id } = req.params
      const user = await Users.findById(id)
      if (!user) {
        res.send({
          status: 'success',
          data: null
        })
      }

      const { username, email, userRoleId } = user
      res.send({
        status: 'success',
        data: { username, email, userRoleId }
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },
  create: async (req, res) => {
    try {
      const { username, email, password } = req.body
      const userRole = await UserRoles.findOne({ role: 'USER' })
      await Users.create({ username, email, password, userRoleId: userRole._id })
      res.send({
        status: 'success',
        data: null
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },
  update: async (req, res) => {
    try {
      const { profile, role } = req.session.user
      if (role.role !== 'ADMIN' && profile._id !== req.params.id) {
        throw new Error('no permission')
      }

      const { username, email, password } = req.body
      const user = await Users.findById(req.params.id)
      if (!user) {
        throw new Error('user not found')
      }

      user.username = username
      user.email = email
      user.password = password
      await user.save()

      res.send({
        status: 'success',
        data: null
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },
  remove: (req, res) => {
    console.log(req.header)
  }
}

module.exports = controller
