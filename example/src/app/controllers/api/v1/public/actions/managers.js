const bcrypt = require('bcryptjs')

module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.service = app.$services.managers
      this.jwtConfig = app.$config.JWT.ADMIN
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
      const { username, password } = ctx.request.body
      const findRes = await this.service.find({
        attributes: ['id', 'username', 'password'],
        where: { username }
      })

      if (findRes.length && bcrypt.compareSync(password, findRes[0].password)) {
        const manager = { id: findRes[0].id, username }

        ctx.send({
          data: { manager, token: await this.sign(manager) }
        })
      } else {
        ctx.send({
          status: 404,
          error: {
            code: '',
            message: '账号或密码错误'
          }
        })
      }
    }
  }
}
