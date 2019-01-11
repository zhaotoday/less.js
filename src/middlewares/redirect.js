module.exports = app => {
  app.use(async (ctx, next) => {
    const { url } = ctx.request
    const ignoreURLs = ['/apis/v1/', '/api/v1/', '/v1/']
    const isIgnoreURL = ignoreURLs.findIndex(item => url.indexOf(item) !== -1) !== -1
    const isMobileURL = url.indexOf('/m/') !== -1

    if (!isIgnoreURL) {
      if (ctx.isMobile) {
        !isMobileURL && ctx.response.redirect(`/m${url}`)
      } else {
        isMobileURL && ctx.response.redirect(url.replace('m/', ''))
      }
    }

    await next()
  })
}
