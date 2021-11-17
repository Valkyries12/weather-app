const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const rulesForJavascript = {
  test: /\.js$/,
  loader: 'babel-loader'
}

const rulesForSass = {
  test: /\.(scss|css)$/,
  use: [/* 'style-loader' */MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
}

const rulesForImages = {
  type: 'asset/resource',
  test: /\.(png|jpe?g|gif|svg)$/i,
  generator: {
    filename: 'img/[hash][ext]'
  }
  /* use: {
    loader: 'file-loader',
    options: {
      outputPath: 'img/'
      // name: '[name][hashcontent].[ext]'
    }
  } */
}

const rules = [rulesForJavascript, rulesForSass, rulesForImages]

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
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new MiniCssExtractPlugin()
    ]
  }
}
