const router = require('koa-router')()

module.exports = app => {
  router.get('/', app.$controllers.web.home.index)
  router.get('/articles/:id?', app.$controllers.web.articles.index)

  router.get('/m', app.$controllers.web.home.index)
  router.get('/m/articles/:id?', app.$controllers.web.articles.index)

  app.use(router.routes()).use(router.allowedMethods())
}
