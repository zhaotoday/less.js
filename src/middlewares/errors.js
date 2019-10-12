module.exports = app => {
  app.use((ctx, next) => {
    return next().catch(err => {
      if (err.original && err.original.errno === 1451) {
        ctx.send({
          status: 501,
          error: {
            code: '',
            message: '请先删除关联数据'
          }
        })
      } else if (err.name === 'JsonWebTokenError' || err.status === 401) {
        ctx.send({
          status: 401,
          error: {
            code: 'AUTHORIZATION/UNAUTHORIZED',
            message: '鉴权失败'
          }
        })
      } else if (err.status === 403) {
        ctx.send({
          status: 403,
          error: {
            code: 'PERMISSION/DENIED',
            message: '权限不足'
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
