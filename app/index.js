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

usersApiRouter
  .get('/', userController.list)
  .post('/', userController.create)
  .get('/:id', userController.find)
  .post('/:id', checkUser(), userController.update)
  .post('/:id/update-role', checkUser('USER_MANAGE'), userController.updateRole)
  .post('/:id/remove', checkUser('USER_MANAGE'), userController.remove)

userRolesApiRouter
  .get('/', userRoleController.list)
  .post('/', userRoleController.create)
  .get('/:id', userRoleController.find)
  .post('/:id', checkUser('USER_ROLE_MANAGE'), userRoleController.update)
  .post('/:id/remove', checkUser('USER_ROLE_MANAGE'), userRoleController.remove)

codeTypesApiRouter
  .get('/', codeTypeController.list)
  .post('/', checkUser('CODE_TYPE_MANAGE'), codeTypeController.create)
  .get('/:id', codeTypeController.find)
  .post('/:id', checkUser('CODE_TYPE_MANAGE'), codeTypeController.update)
  .post('/:id/remove', checkUser('CODE_TYPE_MANAGE'), codeTypeController.remove)

codesApiRouter
  .get('/', codeController.list)
  .post('/', checkUser('CODE_MANAGE'), codeController.create)
  .get('/:id', codeController.find)
  .post('/:id', checkUser('CODE_MANAGE'), codeController.update)
  .post('/:id/remove', checkUser('CODE_MANAGE'), codeController.remove)

commentsApiRouter
  .get('/', commentController.list)
  .post('/', checkUser(), commentController.create)
  .get('/:id', commentController.find)
  .post('/:id', checkUser(), commentController.update)
  .post('/:id/remove', checkUser(), commentController.remove)

apiRouter
  .use('/users', usersApiRouter)
  .use('/user-roles', userRolesApiRouter)
  .use('/code-types', codeTypesApiRouter)
  .use('/codes', codesApiRouter)
  .use('/comments', commentsApiRouter)
  .post('/login', loginController.login)
  .post('/logout', loginController.logout)
  .post('/check-user', loginController.check)

router.use('/api', apiRouter)
router.get('*', (req, res) => res.send('Hello World'))

module.exports = router
