module.exports = app => {
  require('koa-ejs')(app, app.$consts.VIEWS)
}
