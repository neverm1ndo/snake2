const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: "./index.ts",
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Nokia Snake II',
      template: './index.html'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "bundle.[chunkhash].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@engine": path.resolve(__dirname, './src/engine'),
      "@game": path.resolve(__dirname, './src/snake2')
    },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};