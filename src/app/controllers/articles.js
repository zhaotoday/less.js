module.exports = app => {
  return class extends app.Controller {
    constructor () {
      super()
      this.service = app.services.articles
    }

    async index (ctx, next) {
      const items = await app.services.articles.find({offset: 0, limit: 10})
      ctx.response.body = items
      // await ctx.render('articles')
    }
  }
}
