const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const PATHS = {
  build: path.join(__dirname, './build')
};

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: PATHS.build,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(eot|svg)$/,
        use: [{
          loader: 'file-loader', options: { esModule: false }
        }]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader'
        }]
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new Dotenv()
  ],
}
