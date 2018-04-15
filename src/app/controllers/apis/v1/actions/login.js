const bcrypt = require('bcryptjs')

module.exports = app => {
  const service = app.$services.managers

  return class extends app.$Controller {
    /**
     * 登陆
     * @returns {Promise}
     */
    async post (ctx) {
      const {username, password} = ctx.request.body
      const res = await service.find({
        attributes: ['id', 'username', 'password'],
        where: {username}
      })

      if (res.length && bcrypt.compareSync(password, res[0].password)) {
        const manager = {id: res[0].id, username}

        ctx.send({
          data: {manager, token: this.sign(manager)}
        })
      } else {
        ctx.send({
          status: 404,
          error: {
            code: 'MANAGERS/DATA_NOT_FOUND',
            message: '账号或密码错误'
          }
        })
      }
    }
  }
}
