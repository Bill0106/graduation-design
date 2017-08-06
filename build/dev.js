const path = require('path')
const express = require('express')
const proxy = require('express-http-proxy')
const webpack = require('webpack')
const config = require('./webpack.dev')

const compiler = webpack(config)
compiler.apply()

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.publicPath,
  quiet: true,
  inline: true,
})
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

const historyApiFallback = require('connect-history-api-fallback')()
const port = 8080
const proxyIP = '127.0.0.1'
const app = express()

app.use(historyApiFallback)
app.use(devMiddleware)
app.use(hotMiddleware)
app.use('/api/*', proxy(`http://${proxyIP}:8888/api`, {
  forwardPath: function (req, res) {
    return req.originalUrl
  }
}))

app.listen(port, function(err) {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening at http://localhost:${port}/`)
})
