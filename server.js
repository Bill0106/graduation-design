const express = require('express')
const routes = require('./app')
const app = express()

app.use((req, res, next) => {
  const start = new Date().getTime()
  next()
  const ms = new Date().getTime() - start

  console.log(`${req.method} ${req.path} - ${ms}ms`)
})

app.use('/', routes)

app.listen(8888, () => console.log('Listen at http://localhost:8888'))
