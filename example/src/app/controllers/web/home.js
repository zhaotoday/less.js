module.exports = app => {
  return class extends app.$Controller {
    async index (ctx) {
      const { title, keywords, description } = await this.getSetting()
      const globalData = await this.getGlobalData(ctx)

      await ctx.render(`${ctx.isMobile ? 'mobile' : 'pc'}/home`, {
        $: {
          ...globalData,
          view: 'home',
          head: { title, keywords, description }
        }
      })
    }
  }
}
