module.exports = app => {
  return class extends app.$Controller {
    testSign (ctx) {
      const user = {id: 1, name: 'zhao'}

      ctx.send({
        status: 200,
        data: {user, token: this.sign(user)}
      })
    }

    async testVerify (ctx, next) {
      try {
        await this.verify(ctx)
      } catch (err) {
        ctx.response.body = err
      }
    }
  }
}
