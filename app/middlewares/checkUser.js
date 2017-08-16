const Users = require('../models/Users')
const UserRoles = require('../models/UserRoles')
const Logins = require('../models/Logins')

const checkUser = async (req, res, next) => {
  const session = req.headers['x-token']
  const login = await Logins.findOne({ session, valid: true })
  if (!login) {
    res.send({
      status: 'error',
      message: 'login required'
    })
  }

  const user = await Users.findById(login.userId)
  const role = await UserRoles.findById(user.userRoleId)
  req.session.user = { profile: user, role }
  next()
}

module.exports = checkUser
