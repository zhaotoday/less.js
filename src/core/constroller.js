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
      return jwt.sign({data}, app.$consts.JWT.secret, {expiresIn: app.$consts.JWT.expiresIn})
    }

    /**
     * 校验
     * @param {Object} ctx 上下文
     * @returns {Promise}
     */
    verify (ctx) {
      return new Promise((resolve, reject) => {
        try {
          resolve(jwt.verify(ctx.request.headers.authorization, app.$consts.JWT.secret))
        } catch (err) {
          reject(err)
        }
      })
    }

    /**
     * 添加 RESTful 请求方法支持
     * @param {array} methods 请求方法
     */
    addMethods (methods) {
      methods.forEach(value => {
        this[value] = async ctx => {
          await this[`_${value}`](ctx)
        }
      })
    }

    /**
     * 获取单条记录/获取列表
     * @returns {Promise}
     * @private
     */
    async _get (ctx) {
      if (ctx.params.id) {
        ctx.send({
          status: 200,
          data: await this.service.find({id: ctx.params.id})
        })
      } else {
        const {offset, limit, where} = app.$helpers.formatQuery(ctx.request.query)

        ctx.send({
          status: 200,
          data: {
            total: await this.service.count({where}),
            items: await this.service.find({offset, limit, where})
          }
        })
      }
    }

    /**
     * 新增
     * @returns {Promise}
     * @private
     */
    async _post (ctx) {
      ctx.send({
        status: 201,
        data: await this.service.create({body: ctx.request.body})
      })
    }

    /**
     * 更新
     * @returns {Promise}
     * @private
     */
    async _put (ctx) {
      await this.service.update({
        id: ctx.params.id,
        body: ctx.request.body
      })
      ctx.send({status: 204})
    }

    /**
     * 删除
     * @returns {Promise}
     * @private
     */
    async _del (ctx) {
      await this.service.destroy({id: ctx.params.id})
      ctx.send({status: 204})
    }
  }
}
