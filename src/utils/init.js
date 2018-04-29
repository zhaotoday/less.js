const consts = require('./consts')

module.exports = async app => {
  require('./loadToApp')({app, rules: consts.REGISTER_RULES})

  // 同步模型
  await app.$model.sync()
}
