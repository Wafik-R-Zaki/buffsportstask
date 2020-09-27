const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');

const config = {
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: 9000
  }
};

module.exports = merge(config, base);
