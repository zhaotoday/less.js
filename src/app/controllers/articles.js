module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    async index (ctx, next) {
      await ctx.render('articles', {
        items: await service.find({offset: 0, limit: 10})
      })
    }
  }
}
