
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  devServer: {
    hot: true
  },
  module: {
    rules: [
      { 
        test: /\.(ts|js)x$/,
        exclude: '/node_modules',
        use: 'babel-loader' 
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: './src/client/public/index.html' })
  ]
}