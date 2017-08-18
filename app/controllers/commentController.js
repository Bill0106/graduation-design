const Comments = require('../models/Comments')
const Codes = require('../models/Codes')

const controller = {
  list: async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 30
      const page = Number(req.query.page) || 1
      const offset = (page - 1) * limit

      const comments = await Comments.find()
        .limit(limit)
        .skip(offset)
        .populate('userId')
      const total = await Comments.count({})

      res.send({
        status: 'success',
        data: { list: comments, total }
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
      const comment = await Comments.findById(req.params.id)

      res.send({
        status: 'success',
        data: comment
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
      const { user } = req.locals
      const { content, codeId } = req.body
      const code = await Codes.findById(codeId)
      if (!code) {
        throw new Error('code not found')
      }

      await Comments.create({
        content,
        codeId: code._id,
        userId: user._id
      })

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
      const { user } = req.locals
      const comment = await Comments.findById(req.params.id)
      if (user.roleId.role !== 'ADMIN' && user._id !== comment.userId) {
        throw new Error('no permission')
      }

      comment.content = req.body.content
      await comment.save()

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
      const { user } = req.locals
      const comment = await Comments.findById(req.params.id)
      if (user.roleId.role !== 'ADMIN' && user._id !== comment.userId) {
        throw new Error('no permission')
      }

      await comment.remove()

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
