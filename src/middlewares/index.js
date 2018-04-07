const consts = require('../utils/consts')

module.exports = app => {
  require('./jwt')(app)
  require('./send')(app)

  app.use(require('@koa/cors')(consts.CORS))
  app.use(require('koa-static')(consts.STATIC_DIR))
  app.use(require('koa-bodyparser')())
}
