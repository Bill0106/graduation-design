const Logins = require('../models/Logins')
const Users = require('../models/Users')

const checkUser = roles => {
  return async (req, res, next) => {
    try {
      const token = req.headers['x-token']
      const login = await Logins.findOne({ session: token, valid: true })
      if (!login) {
        throw new Error('login required')
      }

      const user = await Users.findById(login.userId).populate('userRoleId')
      if (roles && !roles.includes(user.userRoleId.role)) {
        throw new Error('no permission')
      }

      req.locals = { user }
      next()
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  }
}

module.exports = checkUser
