const consts = require('../utils/consts')
const jwt = require('jsonwebtoken')

module.exports = app => {
  return class {
    constructor () {
      require('class-autobind').default(this)
      this.service = null
    }

    /**
     * 签名
     * @param {Object} data 数据
     * @returns {string}
     */
    sign (data) {
      return jwt.sign({data}, consts.JWT.secret, {expiresIn: consts.JWT.expiresIn})
    }

    /**
     * 校验
     * @param {Object} ctx 上下文
     * @returns {Promise}
     */
    verify (ctx) {
      return new Promise((resolve, reject) => {
        try {
          resolve(jwt.verify(ctx.request.headers.authorization, consts.JWT.secret))
        } catch (err) {
          reject(err)
        }
      })
    }
  }
}
