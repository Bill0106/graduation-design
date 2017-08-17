const mongoose = require('mongoose')
const codeTypePlatforms = require('../constants/codeTypePlatforms')
const Schema = mongoose.Schema

const CodeTypesSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      index: { unique: true }
    },
    platforms: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
)

CodeTypesSchema.pre('save', function(next) {
  if (this.isModified('platforms')) {
    const platforms = codeTypePlatforms.map(item => item.value)
    const diff = this.platforms.filter(item => !platforms.includes(item))
    if (diff.length) {
      const error = new Error('platform is incorrect')
      return next(error)
    }
  }

  next()
})

module.exports = mongoose.model('CodeTypes', CodeTypesSchema)
