const consts = require('../utils/consts')

module.exports = app => {
  app.use(require('@koa/cors')(consts.CORS))
}
