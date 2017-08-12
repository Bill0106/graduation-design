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
})

LoginsSchema.pre('find', function(next) {
  next()
})

module.exports = mongoose.model('Logins', LoginsSchema)
