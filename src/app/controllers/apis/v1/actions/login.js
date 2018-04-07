module.exports = app => {
  return class extends app.$Controller {
    testSign (ctx) {
      const user = {id: 1, name: 'zhao'}

      ctx.response.send({
        status: 200,
        data: {
          user,
          // 生成 token 返回给客户端
          token: this.sign(user)
        }
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
