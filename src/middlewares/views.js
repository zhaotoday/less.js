const consts = require('../utils/consts')

module.exports = app => {
  require('koa-ejs')(app, consts.VIEWS)
}
