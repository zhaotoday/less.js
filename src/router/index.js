const router = require('koa-router')()

module.exports = app => {
  router.get('/articles', app.controllers.articles.index)
  router.get('/apis/v1/articles', app.controllers.apis.v1.articles.index)
  router.get('/apis/v1/actions/login/sign', app.controllers.apis.v1.actions.login.signTest)
  router.get('/apis/v1/actions/login/verify', app.controllers.apis.v1.actions.login.verifyTest)

  app.use(router.routes()).use(router.allowedMethods())
}
