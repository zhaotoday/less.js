const router = require('koa-router')()

module.exports = app => {
  router.get('/articles', app.controllers.articles.index)
  router.get('/apis/v1/articles', app.controllers.apis.v1.articles.index)

  app.use(router.routes())
    .use(router.allowedMethods())
}
