const express = require('express')
const checkUser = require('./middlewares/checkUser')
const userController = require('./controllers/userController')
const userRoleController = require('./controllers/userRoleController')
const codeTypeController = require('./controllers/codeTypeController')
const codeController = require('./controllers/codeController')
const commentController = require('./controllers/commentController')
const loginController = require('./controllers/loginController')

const router = express.Router()
const apiRouter = express.Router()
const usersApiRouter = express.Router()
const userRolesApiRouter = express.Router()
const codeTypesApiRouter = express.Router()
const codesApiRouter = express.Router()
const commentsApiRouter = express.Router()

const checkAdmin = checkUser(['ADMIN'])
const checkLogin = checkUser()

usersApiRouter
  .get('/', userController.list)
  .post('/', userController.create)
  .get('/:id', userController.find)
  .post('/:id', checkLogin, userController.update)
  .post('/:id/update-role', checkAdmin, userController.updateRole)
  .post('/:id/remove', checkAdmin, userController.remove)

userRolesApiRouter
  .get('/', userRoleController.list)
  .post('/', userRoleController.create)
  .get('/:id', userRoleController.find)
  .post('/:id', userRoleController.update)
  .post('/:id/remove', userRoleController.remove)

codeTypesApiRouter
  .get('/', codeTypeController.list)
  .post('/', codeTypeController.create)
  .get('/:id', codeTypeController.find)
  .post('/:id', codeTypeController.update)
  .post('/:id/remove', codeTypeController.remove)

codesApiRouter
  .get('/', codeController.list)
  .post('/', codeController.create)
  .get('/:id', codeController.find)
  .post('/:id', codeController.update)
  .post('/:id/remove', codeController.remove)

commentsApiRouter
  .get('/', commentController.list)
  .post('/', commentController.create)
  .get('/:id', commentController.find)
  .post('/:id', commentController.update)
  .post('/:id/remove', commentController.remove)

apiRouter
  .use('/users', usersApiRouter)
  .use('/user-roles', userRolesApiRouter)
  .use('/code-types', codeTypesApiRouter)
  .use('/codes', codesApiRouter)
  .post('/login', loginController.login)
  .post('/logout', loginController.logout)

router.use('/api', apiRouter)
router.get('*', (req, res) => res.send('Hello World'))

module.exports = router
