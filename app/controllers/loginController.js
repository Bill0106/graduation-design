const crypto = require('crypto')
const Logins = require('../models/Logins')
const Users = require('../models/Users')

const controller = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await Users.findOne({ email })
      if (!user) {
        throw new Error('user not found')
      }

      const isPasswordMatched = await user.comparePassword(password)
      if (!isPasswordMatched) {
        throw new Error('email or password is incorrect')
      }

      const session = await Logins.findOne({ userId: user._id, valid: true })
      if (session) {
        session.valid = false
        await session.save()
      }

      const buf = crypto.randomBytes(32).toString('hex')
      await Logins.create({ userId: user._id, session: buf })

      res.send({
        status: 'success',
        data: {
          token: buf
        }
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers['x-token']
      const login = await Logins.findOne({ session: token, valid: true })
      if (!login) {
        throw new Error('login profile not found')
      }

      login.valid = false
      await login.save()

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

  check: async (req, res) => {
    try {
      const token = req.headers['x-token']
      const login = await Logins.findOne({ session: token })
      if (!login) {
        throw new Error('login profile not found')
      }

      if (!login.valid) {
        throw new Error('login session outdated')
      }

      const user = await Users.findById(login.userId)
        .populate('userRoleId')
        .select('-password')

      res.send({
        status: 'success',
        data: {
          user: {
            username: user.username,
            email: user.email,
            permissions: user.userRoleId.permissionCodes
          }
        }
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
