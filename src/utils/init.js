const consts = require('./consts')

module.exports = async app => {
  // 注册对象到 app
  require('./register')({app, rules: consts.REGISTER_RULES})

  require('koa-ejs')(app, consts.VIEWS)

  // 同步模型
  await app.model.sync()
}
