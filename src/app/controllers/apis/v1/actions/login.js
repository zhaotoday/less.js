module.exports = app => {
  return class extends app.Controller {
    signTest (ctx, next) {
      ctx.response.body = {
        message: '登录成功',
        // 生成 token 返回给客户端
        token: this.sign({id: 1, name: 'zhao'})
      }
    }

    async verifyTest (ctx, next) {
      try {
        await this.verify(ctx)
      } catch (err) {
        ctx.response.body = err
      }
    }
  }
}
