module.exports = async app => {
  require('./loadToApp')(app)

  // 同步模型
  await app.$model.sync()
}
