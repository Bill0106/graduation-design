const Comments = require('../models/Comments')
const Codes = require('../models/Codes')

const controller = {
  list: async (req, res) => {
    try {
      const { limit, page, codeId } = req.query
      const _limit = Number(limit) || 30
      const _page = Number(page) || 1
      const offset = (_page - 1) * _limit

      const query = {}
      if (codeId) {
        query.codeId = codeId
      }

      const comments = await Comments.find(query)
        .limit(_limit)
        .skip(offset)
        .populate('userId', 'username')
      const total = await Comments.count(query)

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
