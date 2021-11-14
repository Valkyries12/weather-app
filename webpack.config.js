const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const rulesForJavascript = {
  test: /\.js$/,
  loader: 'babel-loader'
}

const rulesForSass = {
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}

const rules = [rulesForJavascript, rulesForSass]

module.exports = (env, argv) => {
  // entry: "./src/index.js"
  const { mode } = argv
  const isProduction = mode === 'production'
  return {
    output: {
      filename: isProduction
        ? '[name].[contenthash].js'
        : 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: rules
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ]
  }
}
