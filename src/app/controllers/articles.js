module.exports = app => {
  return class extends app.Controller {
    async index (ctx, next) {
      ctx.response.body = await app.services.articles.find({offset: 0, limit: 10})
      // await ctx.render('articles')
    }
  }
}
