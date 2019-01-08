module.exports = app => {
  app.use(async (ctx, next) => {
    const { url } = ctx.request
    const whitelist = ['/api/v1/']

    if (whitelist.findIndex(item => url.indexOf(item) !== -1) !== -1) {
      await next()
    } else {
      if (ctx.isMobile) {
        if (url.indexOf('/m/') === -1 && url !== '/m') {
          ctx.response.redirect(`/m${url}`)
        } else {
          await next()
        }
      } else {
        if (url.indexOf('/m/') !== -1) {
          ctx.response.redirect(url.replace('m/', ''))
        } else if (url === '/m') {
          ctx.response.redirect(url.replace('m', ''))
        } else {
          await next()
        }
      }
    }
  })
}
