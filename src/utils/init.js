const consts = require('../utils/consts')

module.exports = async app => {
  require('./register')({app, rules: consts.REGISTER_RULES})

  require('koa-ejs')(app, consts.VIEWS)

  await app.model.sync()
}
