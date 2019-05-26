module.exports = (router, path, controller) => {
  const methods = ['get', 'post', 'put', 'del']

  methods.forEach(method => {
    if (controller[method]) {
      router[method](method === 'post' ? path : `${path}/:id?`, async (ctx, next) => {
        if (controller.requiresAuth) {
          const verifyRes = await controller.verify(ctx)
          await controller[method](ctx, next, verifyRes)
        } else {
          await controller[method](ctx, next)
        }

        next()
      })
    }
  })
}
