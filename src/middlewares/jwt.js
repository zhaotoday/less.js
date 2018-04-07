var jwt = require('koa-jwt')

module.exports = app => {
  app.use((ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.response.status = 401
        ctx.response.body = {
          error: '鉴权失败'
        }
      } else {
        throw err
      }
    })
  })

  app.use(jwt({secret: 'shared-secret'}).unless({
    path: [
      /^\/$/,
      /^\/articles/,
      /\/login/
    ]
  }))
}
