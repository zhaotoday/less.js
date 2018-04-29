module.exports = app => {
  app.use(require('koa-static')(app.$consts.STATIC_DIR))
}
