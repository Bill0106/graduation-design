const express = require('express')
const userController = require('./controllers/userController')
const codeTypeController = require('./controllers/codeTypeController')
const codeController = require('./controllers/codeController')
const loginController = require('./controllers/loginController')

const router = express.Router()
const apiRouter = express.Router()
const userApiRouter = express.Router()
const codeTypeApiRouter = express.Router()
const codeApiRouter = express.Router()

userApiRouter
  .get('/', userController.list)
  .post('/', userController.create)
  .get('/:id', userController.find)
  .post('/:id', userController.update)
  .post('/:id/remove', userController.remove)

codeTypeApiRouter
  .get('/', codeTypeController.list)
  .post('/', codeTypeController.create)
  .get('/:id', codeTypeController.find)
  .post('/:id', codeTypeController.update)
  .post('/:id/remove', codeTypeController.remove)

codeApiRouter
  .get('/', codeController.list)
  .post('/', codeController.create)
  .get('/:id', codeController.find)
  .post('/:id', codeController.update)
  .post('/:id/remove', codeController.remove)

apiRouter
  .use('/users', userApiRouter)
  .use('/code-types', codeTypeApiRouter)
  .use('/codes', codeApiRouter)
  .post('/login', loginController.login)
  .post('/logout', loginController.logout)

router.use('/api', apiRouter)
router.get('*', (req, res) => res.send('Hello World'))

module.exports = router
