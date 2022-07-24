const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: './src/index.js',  //['babel-polyfill', './src/index.js'],

  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'inline-source-map',
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|th/),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
};

module.exports = merge(baseConfig, config);
