const send = require('koa-send')

module.exports = app => {
  app.use(async (ctx, next) => {
    ctx.attachment = async ({ fileName, filePath } = {}) => {
      ctx.response.attachment(fileName)
      await send(ctx, filePath)
    }

    await next()
  })
}
