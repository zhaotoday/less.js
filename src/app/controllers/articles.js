module.exports = app => {
  const service = app.services.articles

  return class extends app.Controller {
    async index (ctx, next) {
      ctx.response.body = await service.find({offset: 0, limit: 10})
      // await ctx.render('articles')
    }
  }
}
