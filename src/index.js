const Koa = require('koa')
const app = new Koa()

require('./extends')(app)
require('./middlewares')(app)
require('./utils/router')(app)

module.exports = app
