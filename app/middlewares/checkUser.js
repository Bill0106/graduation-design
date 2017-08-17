const Users = require('../models/Users')
const UserRoles = require('../models/UserRoles')
const Logins = require('../models/Logins')

const checkUser = async (req, userId) => {
  const session = req.headers['x-token']
  const login = await Logins.findOne({ session, valid: true })
  if (!login) {
    return {
      checked: false,
      message: 'login required'
    }
  }

  const user = await Users.findById(login.userId)
  const role = await UserRoles.findById(user.userRoleId)
  let hasPermission = false
  if (role.role === 'ADMIN') {
    hasPermission = true
  }

  if (userId && userId === user._id) {
    hasPermission = true
  }

  if (!hasPermission) {
    return {
      checked: false,
      message: 'no permission'
    }
  }

  return { checked: true }
}

module.exports = checkUser
