const session = require('koa-session')

module.exports = app => {
  app.keys = app.$config.APP_KEYS

  app.use(session(app.$config.SESSION, app))
}
