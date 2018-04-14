module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    constructor () {
      super()
      this.a = 2
    }

    async index (ctx, next) {
      ctx.send({
        status: 200,
        data: await service.find({offset: 0, limit: 10})
      })
    }

    async get (ctx) {
      if (ctx.params.id) {
        ctx.send({
          data: '单条记录'
        })
      } else {
        ctx.send({
          data: '列表'
        })
      }
    }
  }
}
