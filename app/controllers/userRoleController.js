const UserRoles = require('../models/UserRoles')

const controller = {
  list: async (req, res) => {
    try {
      const list = await UserRoles.find()
      const total = await UserRoles.count({})
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
      const userRole = await UserRoles.findById(req.params.id)

      res.send({
        status: 'success',
        data: userRole
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
      const { role, roleName, permissionCodes } = req.body
      await UserRoles.create({ role, roleName, permissionCodes })
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

  update: async (req, res) => {
    try {
      const { role, roleName, permissionCodes } = req.body
      const userRole = await UserRoles.findById(req.params.id)
      if (!userRole) {
        throw new Error('user role not found')
      }

      userRole.role = role
      userRole.roleName = roleName
      userRole.permissionCodes = permissionCodes

      await userRole.save()
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
      await UserRoles.findByIdAndRemove(req.params.id)
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
