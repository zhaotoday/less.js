module.exports = app => {
  app.use(async (ctx, next) => {
    const ip = ctx.req.headers['x-forwarded-for'] ||
      ctx.req.connection.remoteAddress ||
      ctx.req.socket.remoteAddress ||
      ctx.req.connection.socket.remoteAddress

    ctx.clientIP = ip.indexOf('::ffff:') !== -1
      ? ip.substring(7)
      : ip

    await next()
  })
}
