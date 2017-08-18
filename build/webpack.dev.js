const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('./webpack.base')
const utils = require('./utils')

const hots = ['webpack-hot-middleware/client?noInfo=true&reload=true']

config.entry.app = hots.concat(config.entry.app)

module.exports = merge(config, {
  module: {
    rules: utils.styleLoaders({ sourceMap: false })
  },
  devtool: '#cheap-module-eval-source-map',
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
