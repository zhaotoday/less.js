const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const consts = require('../utils/consts')
const helpers = require('../utils/helpers')

module.exports = app => {
  const controllerDir = path.resolve(consts.DIRS.CONTROLLERS)

  const recurrence = dir => {
    fs.readdirSync(dir).forEach(file => {
      const extname = path.extname(file)
      const basename = path.basename(file, extname)

      if (extname === '.js') {
        const url = `${dir.replace(controllerDir, '').replace(/\\/g, '/')}/${basename}`
        const controller = new (require(path.join(dir, file))(app))()

        if (url.indexOf('api') === -1) {
          router.get(`${url}/:id?`, controller.index)
        } else {
          app.$resources(router, helpers.formatRouteURL(url), controller)
        }
      } else {
        recurrence(path.join(dir, file))
      }
    })
  }

  recurrence(controllerDir)

  app.use(router.routes()).use(router.allowedMethods())

  const routerModule = require('../utils/load-module')(`${consts.DIRS.ROUTER}/index.js`)

  routerModule && routerModule(app)
}
