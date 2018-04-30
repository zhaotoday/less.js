module.exports = async app => {
  require('./loadToApp')(app)
  require('./middlewares')(app)
  require('./router')(app)

  // 同步模型
  await app.$model.sync()
}
