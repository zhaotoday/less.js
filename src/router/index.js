const router = require('koa-router')()

module.exports = app => {
  router.get('/articles', app.controllers.articles.index)

  app.use(router.routes())
    .use(router.allowedMethods())
}
