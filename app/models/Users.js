const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: Schema.Types.String,
    required: true,
    index: { unique: true },
  },
  userRoleId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  password: String,
}, {
  timestamps: true
})

UsersSchema.pre('save', (next) => {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.passwordm, salt, (err, hash) => {
      if (err) {
        return next(err)
      }

      user.password = hash
      next()
    })
  })
})

UsersSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }

    cb(null, isMatch)
  })
}

module.exports = mongoose.model('users', UsersSchema)
