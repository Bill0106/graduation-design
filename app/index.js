const express = require('express')
const userController = require('./controllers/userController')

const router = express.Router()
const apiRouter = express.Router()
const userApiRouter = express.Router()

userApiRouter
  .get('/', userController.list)
  .post('/', userController.create)
  .get('/:id', userController.find)
  .post('/:id', userController.update)
  .post('/:id/remove', userController.remove)

apiRouter
  .use('/user', userApiRouter)

router.use('/api', apiRouter)
router.get('*', (req, res) => res.send('Hello World'))

module.exports = router
