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
  logout: (req, res) => {},
}

module.exports = controller
