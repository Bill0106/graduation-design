const express = require('express')
const userController = require('./controllers/userController')
const loginController = require('./controllers/loginController')

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
  .post('/login', loginController.login)
  .post('/logout', loginController.logout)

router.use('/api', apiRouter)
router.get('*', (req, res) => res.send('Hello World'))

module.exports = router
