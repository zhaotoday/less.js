const consts = require('../utils/consts')

module.exports = app => {
  app.use(require('koa-static')(consts.STATIC_DIR))
}
