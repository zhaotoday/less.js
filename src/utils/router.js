const router = require('koa-router')()
const loadModule = require('../utils/loadModule')

module.exports = app => {
  const routerModule = loadModule(app, `src/${app.$consts.DIRS.ROUTER}/index.js`)

  if (routerModule) {
    routerModule(app)
    app.use(router.routes()).use(router.allowedMethods())
  }
}
