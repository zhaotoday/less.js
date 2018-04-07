module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    async index (ctx, next) {
      ctx.response.body = ctx.send({
        status: 200,
        data: await service.find({offset: 0, limit: 10})
      })
    }
  }
}
