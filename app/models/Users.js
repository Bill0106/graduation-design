const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: Schema.Types.String,
      required: true,
      index: { unique: true }
    },
    userRoleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'UserRoles'
    },
    password: {
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

UsersSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
  }

  return next()
})

UsersSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('users', UsersSchema)
