const CodeTypes = require('../models/CodeTypes')

const controller = {
  list: async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 30
      const page = Number(req.query.page) || 1
      const offset = (page - 1) * limit

      const list = await CodeTypes.find().limit(limit).skip(offset)
      const total = await CodeTypes.count({})

      res.send({
        status: 'success',
        data: { list, total }
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },

  find: async (req, res) => {
    try {
      const codeType = await CodeTypes.findById(req.params.id)

      res.send({
        status: 'success',
        data: codeType
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },

  create: async (req, res) => {
    try {
      const { name, platforms } = req.body
      await CodeTypes.create({ name, platforms })

      res.send({
        status: 'success',
        data: null
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },

  update: async (req, res) => {
    try {
      const codeType = await CodeTypes.findById(req.params.id)
      if (!codeType) {
        throw new Error('code type not found')
      }

      codeType.name = req.body.name
      codeType.platforms = req.body.platforms

      await codeType.save()
      res.send({
        status: 'success',
        data: null
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  },

  remove: async (req, res) => {
    try {
      await CodeTypes.findByIdAndRemove(req.params.id)
      res.send({
        status: 'success',
        data: null
      })
    } catch (error) {
      res.send({
        status: 'error',
        message: error.message
      })
    }
  }
}

module.exports = controller
