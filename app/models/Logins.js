const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginsSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  session: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
})

LoginsSchema.pre('find', function(next) {
  const login = this
  console.log(login)
})

module.exports = mongoose.model('Logins', LoginsSchema)
