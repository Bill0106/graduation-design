const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('./webpack.base')

const hots = ['webpack-hot-middleware/client?noInfo=true&reload=true']

config.entry.app = hots.concat(config.entry.app)
config.output.filename = 'bundle.js'
config.output.publicPath = '/'

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
})
