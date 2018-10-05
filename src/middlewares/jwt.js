const jwt = require('koa-jwt')

module.exports = app => {
  app.use(jwt({ secret: app.$config.JWT.secret }).unless({
    path: app.$config.JWT.unlessPath
  }))
}
