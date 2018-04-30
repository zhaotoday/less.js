const router = require('koa-router')()

module.exports = app => {
  const routerModule = require('../utils/loadModule')(`${app.$consts.DIRS.ROUTER}/index.js`)

  if (routerModule) {
    routerModule(app)
    app.use(router.routes()).use(router.allowedMethods())
  }
}
