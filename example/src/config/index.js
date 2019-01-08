const baseConfig = require('./base')
const envConfig = require(`./${process.env.NODE_ENV}`)

module.exports = () => ({ ...baseConfig, ...envConfig })
