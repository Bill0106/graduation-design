const Codes = require('../models/Codes')
const CodeTypes = require('../models/CodeTypes')

const controller = {
  list: async (req, res) => {
    try {
      const { limit, page, codeType, platform } = req.query
      const _limit = Number(limit) || 30
      const _page = Number(page) || 1
      const offset = (_page - 1) * _limit

      const query = {}
      if (codeType) {
        const codeTypeId = await CodeTypes.findOne({ name: codeType })
        if (codeTypeId) {
          query.codeTypeId = codeTypeId._id
        }
      }
      if (platform) {
        query.codePlatforms = platform
      }

      const list = await Codes.find(query)
        .limit(_limit)
        .skip(offset)
        .populate('codeTypeId', 'name')
        .populate('userId', 'username')
      const count = await Codes.count(query)

      res.send({
        status: 'success',
        data: { list, count }
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
      const code = await Codes.findById(req.params.id)
        .populate('codeTypeId', 'name')
        .populate('userId', 'username')

      res.send({
        status: 'success',
        data: code
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
      const { title, code, codeTypeId, codePlatforms } = req.body
      const codeType = await CodeTypes.findById(codeTypeId)
      if (!codeType) {
        throw new Error('code type not found')
      }

      const data = await Codes.create({
        title,
        code,
        codeTypeId,
        codePlatforms,
        userId: user._id
      })

      res.send({
        status: 'success',
        data: {
          id: data._id
        }
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
      const { title, code, codeTypeId, codePlatforms } = req.body
      const codeData = await Codes.findById(req.params.id)
      if (user.roleId.role !== 'ADMIN' && codeData.userId !== user._id) {
        throw new Error('no permission')
      }

      const codeType = await CodeTypes.findById(codeTypeId)
      if (!codeType) {
        throw new Error('code type not found')
      }

      codeData.title = title
      codeData.code = code
      codeData.codeTypeId = codeTypeId
      codeData.codePlatforms = codePlatforms

      await codeData.save()

      res.send({
        status: 'success',
        data: codeData._id
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
      const code = await Codes.findById(req.params.id)
      if (user.roleId.role !== 'ADMIN' && code.userId !== user._id) {
        throw new Error('no permission')
      }

      await code.remove()

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
