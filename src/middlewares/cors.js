module.exports = app => {
  app.use(require('@koa/cors')(app.$config.CORS))
}
