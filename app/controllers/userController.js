const Users = require('../models/Users')
const UserRoles = require('../models/UserRoles')

const controller = {
  list: async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 30
      const page = Number(req.query.page) || 1
      const offset = (page - 1) * limit
      const list = await Users.find()
        .limit(limit)
        .skip(offset)
        .populate('userRoleId')
        .select('-password')
      const total = await Users.count({})

      res.send({
        status: 'success',
        data: { list, total }
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },

  find: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .populate('userRoleId')
        .select('-password')

      res.send({
        status: 'success',
        data: user
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
      await Users.create({
        username,
        email,
        password,
        userRoleId: userRole._id
      })
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
      const operator = req.locals.user
      if (
        operator.userRoleId.role !== 'ADMIN' &&
        String(operator._id) !== req.params.id
      ) {
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

  updateRole: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
      if (!user) {
        throw new Error('user not found')
      }

      const role = await UserRoles.findById(req.body.role)
      if (!role) {
        throw new Error('user role not found')
      }

      user.userRoleId = role._id
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

  remove: async (req, res) => {
    try {
      await Users.findByIdAndRemove(req.params.id)
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
  }
}

module.exports = controller
