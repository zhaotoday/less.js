module.exports = app => {
  app.use(require('koa-body')({multipart: true}))
}
