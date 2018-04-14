module.exports = app => {
  return class extends app.$Controller {
    post (ctx) {
      const user = {id: 1, name: 'zhao'}

      ctx.send({
        status: 200,
        data: {user, token: this.sign(user)}
      })
    }

    async verify (ctx) {
      try {
        ctx.send({
          data: await this.verify(ctx)
        })
      } catch (err) {
        ctx.send({
          status: 404,
          error: err
        })
      }
    }
  }
}
