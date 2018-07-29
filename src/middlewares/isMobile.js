const MobileDetect = require('mobile-detect')

module.exports = app => {
  app.use(async (ctx, next) => {
    const md = new MobileDetect(ctx.request.headers['user-agent'])

    ctx.isMobile = !!md.mobile()

    await next()
  })
}
