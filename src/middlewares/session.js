const session = require('koa-session')

module.exports = app => {
  app.keys = app.$consts.KEYS

  app.use(session(app.$consts.SESSION, app))
}
