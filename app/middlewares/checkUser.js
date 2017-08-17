const Users = require('../models/Users')
const UserRoles = require('../models/UserRoles')
const Logins = require('../models/Logins')

const checkUser = roles => {
  return async (req, res, next) => {
    try {
      const token = req.headers['x-token']
      const login = await Logins.findOne({ session: token, valid: true })
      if (!login) {
        throw new Error('login required')
      }

      const user = await Users.findById(login.userId)
      const role = await UserRoles.findById(user.userRoleId)
      if (roles && !roles.includes(role.role)) {
        throw new Error('no permission')
      }

      req.local.user = user
      req.local.role = role
      next('111')
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  }
}

module.exports = checkUser
