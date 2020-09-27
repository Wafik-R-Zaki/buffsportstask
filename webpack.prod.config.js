// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

const config = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = merge(config, base);
