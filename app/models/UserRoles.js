const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserRolesSchema = new Schema(
  {
    role: {
      type: Schema.Types.String,
      required: true,
      index: { unique: true }
    },
    roleName: {
      type: Schema.Types.String,
      required: true,
      index: { unique: true }
    },
    permissionCodes: {
      type: Array
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('UserRoles', UserRolesSchema)
