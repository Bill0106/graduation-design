const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeTypesSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    index: { unique: true }
  },
  platforms: {
    type: [String],
    required: true,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('CodeTypes', CodeTypesSchema)
