const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeTypesSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    index: { unique: true }
  },
  platforms: {
    type: Schema.Types.Array,
    required: true,
  }
})

module.exports = mongoose.model('CodeTypes', CodeTypesSchema)
