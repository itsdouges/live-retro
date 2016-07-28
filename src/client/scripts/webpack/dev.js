const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const config = Object.assign({}, baseConfig, {
  entry: [
    './src/index',
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  module: defaultSettings.getDefaultModules(),
});

config.module.loaders.push({
  test: /\.(js)$/,
  loader: 'react-hot!babel-loader',
  include: [config.additionalPaths, path.join(__dirname, '/../src')],
});

module.exports = config;
