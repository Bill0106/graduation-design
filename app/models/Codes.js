const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'Users',
  },
  codeTypeId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'CodeTypes',
  },
  codePlatforms: {
    type: [String],
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Codes', CodesSchema)
