module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.service = app.$services.articles
    }

    async index (ctx) {
      const { title, keywords, description } = await this.getSetting()
      const globalData = await this.getGlobalData(ctx)
      const id = ctx.params.id || ''

      if (id) {
        const findRes = await this.service.find({ id })
        const categoriesFindRes = await app.$services.categories.find({
          where: { alias: findRes.alias },
          offset: 0,
          limit: -1
        })

        await ctx.render(`${ctx.isMobile ? 'mobile' : 'pc'}/articles-detail`, {
          $: {
            ...globalData,
            view: 'articles-detail',
            head: { title, keywords, description },
            detail: findRes,
            categories: categoriesFindRes
          }
        })
      } else {
        const { PAGE_SIZE } = app.$config
        const alias = ctx.query.a || ''
        const categoryId = ctx.query.c || 0
        const page = +ctx.query.p || 1
        const where = categoryId ? { alias, categoryId } : { alias }

        await ctx.render(`${ctx.isMobile ? 'mobile' : 'pc'}/articles-list`, {
          $: {
            ...globalData,
            view: 'articles-list',
            head: { title, keywords, description },
            alias,
            categories: await app.$services.categories.find({
              where: { alias },
              offset: 0,
              limit: -1
            }),
            category: categoryId ? await app.$services.categories.find({ id: categoryId }) : null,
            total: await this.service.count({ where }),
            items: await this.service.find({
              where,
              offset: (page - 1) * PAGE_SIZE,
              limit: PAGE_SIZE
            }),
            page
          }
        })
      }
    }
  }
}
