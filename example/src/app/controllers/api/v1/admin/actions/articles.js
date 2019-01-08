module.exports = app => {
  return class extends require('../base')(app) {
    constructor () {
      super()

      this.service = app.$services.articles
    }

    async post (ctx) {
      const { type } = ctx.request.body

      switch (type) {
        case 'TO_PREV':
          await this._toPrev(ctx)
          break
        case 'TO_NEXT':
          await this._toNext(ctx)
          break
        default:
          break
      }
    }

    async _toPrev (ctx) {
      const { id } = ctx.request.body
      const { where } = app.$helpers.formatQuery(ctx.request.query)
      const findRes = await this.service.find({ id })
      const findPrevRes = await this.service.findPrev({
        where: {
          ...where,
          order: {
            $gt: findRes.order
          }
        }
      })

      if (findPrevRes) {
        await this.service.update({
          id,
          body: { order: findPrevRes.order }
        })

        await this.service.update({
          id: findPrevRes.id,
          body: { order: findRes.order }
        })
      }

      ctx.send({ status: 204 })
    }

    async _toNext (ctx) {
      const { id } = ctx.request.body
      const { where } = app.$helpers.formatQuery(ctx.request.query)
      const findRes = await this.service.find({ id })
      const findNextRes = await this.service.findNext({
        where: {
          ...where,
          order: {
            $lt: findRes.order
          }
        }
      })

      if (findNextRes) {
        await this.service.update({
          id,
          body: { order: findNextRes.order }
        })

        await this.service.update({
          id: findNextRes.id,
          body: { order: findRes.order }
        })
      }

      ctx.send({ status: 204 })
    }
  }
}
