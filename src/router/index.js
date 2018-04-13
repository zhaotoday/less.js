const router = require('koa-router')()

module.exports = app => {
  require('./routes/articles')(app, router)
  require('./routes/apis/v1/articles')(app, router)
  require('./routes/apis/v1/actions/login')(app, router)

  app.use(router.routes()).use(router.allowedMethods())
}
