const mongoose = require('mongoose')
const codeTypePlatforms = require('../constants/codeTypePlatforms')
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

CodesSchema.pre('save', function(next) {
  if (this.isModified('codePlatforms')) {
    const platforms = codeTypePlatforms.map(item => item.value)
    const diff = this.codePlatforms.filter(item => !platforms.includes(item))
    if (diff.length) {
      const error = new Error('code platform is incorrect')
      return next(error)
    }
  }

  next()
})

module.exports = mongoose.model('Codes', CodesSchema)
