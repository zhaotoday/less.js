module.exports = app => {
  app.use(async (ctx, next) => {
    ctx.send = ({ status = 200, error = null, data = null } = {}) => {
      ctx.response.status = status
      ctx.response.body = { error, data }
    }

    await next()
  })
}
