const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf')
const context = path.join(__dirname, '..', 'vue')

module.exports = {
  context,
  entry: {
    app: './main.js'
  },
  output: {
    path: path.join(__dirname, '../', 'public/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': context
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [context],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [context]
      }
    ]
  }
}
