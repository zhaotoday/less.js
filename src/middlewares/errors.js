module.exports = app => {
  app.use((ctx, next) => {
    return next().catch(err => {
      if (err.name === 'JsonWebTokenError' || err.status === 401) {
        ctx.send({
          status: 401,
          error: {
            code: 'AUTHORIZATION/UNAUTHORIZED',
            message: '鉴权失败'
          }
        })
      } else {
        ctx.send({
          status: 500,
          error: {
            code: '',
            message: '服务器错误'
          }
        })
      }
    })
  })
}
