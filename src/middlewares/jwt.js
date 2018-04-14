const jwt = require('koa-jwt')
const consts = require('../utils/consts')

module.exports = app => {
  app.use((ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.send({
          status: 401,
          error: {
            code: 'AUTHORIZATION/UNAUTHORIZED',
            message: '鉴权失败'
          }
        })
      } else {
        throw err
      }
    })
  })

  app.use(jwt({secret: consts.JWT.secret}).unless({
    path: [
      /^\/$/,
      /^\/articles/,
      /\/login/
    ]
  }))
}
