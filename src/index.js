const Koa = require('koa')
const app = new Koa()

require('./utils/init')(app)

module.exports = app
