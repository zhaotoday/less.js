const bcrypt = require('bcryptjs')

module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.service = app.$services.managers
      this.addMethods(['put'])
    }

    post (ctx) {
      const {password} = ctx.request.body
      const passwordHash = (() => {
        // 生成 salt 的迭代次数
        const SALT_ROUNDS = 10
        // 随机生成 salt
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        // 获取 hash 值
        return bcrypt.hashSync(password, salt)
      })()

      ctx.send({data: passwordHash})
    }
  }
}
