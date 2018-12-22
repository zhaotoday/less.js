module.exports = (router, path, controller) => {
  const methods = ['get', 'post', 'put', 'del']

  methods.forEach(method => {
    if (controller[method]) {
      router[method](`${path}/:id?`, async (ctx, next) => {
        const { id } = ctx.params

        // id 存在且非法
        if (id && !+id) {
          next()
        } else {
          if (controller.requiresAuth) {
            const verifyRes = await controller.verify(ctx)
            await controller[method](ctx, next, verifyRes)
          } else {
            await controller[method](ctx, next)
          }
          next()
        }
      })
    }
  })
}
