const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      ref: 'Users'
    },
    session: {
      type: String,
      required: true
    },
    valid: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Logins', LoginsSchema)
