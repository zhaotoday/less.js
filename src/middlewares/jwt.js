const jwt = require('koa-jwt')

module.exports = app => {
  app.use(jwt({secret: app.$consts.JWT.secret}).unless({
    path: [
      /^\/$/,
      /^\/articles/,
      /\/login/
    ]
  }))
}
