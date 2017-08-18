const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Users'
    },
    codeId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Codes'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Comments', CommentsSchema)
