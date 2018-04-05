const consts = require('../utils/consts')
const path = require('path')

module.exports = async app => {
  require('./register')({app, rules: consts.REGISTER_RULES})

  require('koa-ejs')(app, {
    root: path.join(__dirname, '../app/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
  })

  await app.model.sync()
}
