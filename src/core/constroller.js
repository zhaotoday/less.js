const consts = require('../utils/consts')
const jwt = require('jsonwebtoken')

module.exports = app => {
  return class {
    constructor () {
      require('class-autobind').default(this)
      this.service = null
    }

    sign (data) {
      return jwt.sign({data}, consts.JWT.secret, {expiresIn: consts.JWT.expiresIn})
    }

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
