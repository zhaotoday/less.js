module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.service = app.$services.wxUsers
      this.jwtConfig = app.$config.JWT.WX
    }

    async post (ctx) {
      const { type } = ctx.request.body

      switch (type) {
        case 'LOGIN':
          await this._login(ctx)
          break
        default:
          break
      }
    }

    async _login (ctx) {
      const { code, encryptedData, iv } = ctx.request.body
      const { id, nickName, avatarUrl } = await this.service.login({ code, encryptedData, iv })
      const wxUser = { id, nickName, avatarUrl }

      ctx.send({
        data: {
          wxUser,
          token: await this.sign(wxUser)
        }
      })
    }
  }
}
