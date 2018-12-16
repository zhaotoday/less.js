module.exports = (router, path, controller) => {
  const methods = ['get', 'post', 'put', 'del']

  methods.forEach(method => {
    if (controller[method]) {
      router[method](`${path}/:id?`, async (ctx, next) => {
        if (controller.jwtConfig) {
          const verifyRes = await controller.verify(ctx)
          await controller[method](ctx, verifyRes)
        } else {
          await controller[method](ctx)
        }
        next()
      })
    }
  })
}
