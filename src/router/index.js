const router = require('koa-router')()

module.exports = app => {
  require('./routes/articles')(app, router)
  require('./routes/apis/articles')(app, router)
  require('./routes/apis/actions/login')(app, router)

  app.use(router.routes()).use(router.allowedMethods())
}
