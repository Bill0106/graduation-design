const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./app')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/codeShareService', {
  useMongoClient: true
})
mongoose.connection.on('error', console.error)

app.use((req, res, next) => {
  const start = new Date().getTime()
  next()
  const ms = new Date().getTime() - start

  console.log(`${req.method} ${req.path} - ${ms}ms`)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes)

app.listen(8888, () => console.log('Listen at http://localhost:8888'))
