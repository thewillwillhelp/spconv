const webpackDevConfig = require('./webpack.config.dev');

module.exports = {
    ...webpackDevConfig,
    mode: 'production'
}