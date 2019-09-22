const consts = require('../utils/consts')

module.exports = app => {
  const jwt = require('../modules/jwt')(app)

  class Controller {
    constructor () {
      require('class-autobind').default(this)
      this.service = null
      this.requiresAuth = false
      this.jwtConfig = null
    }

    /**
     * 签名
     * @param {Object} data 数据
     * @returns {Promise}
     */
    sign (data) {
      const { SECRET, EXPIRES_IN } = this.jwtConfig
      return jwt.sign({ data }, SECRET, { expiresIn: EXPIRES_IN })
    }

    /**
     * 校验
     * @param {Object} ctx 上下文
     * @returns {Promise}
     */
    verify (ctx) {
      const { SECRET } = this.jwtConfig
      return jwt.verify((ctx.request.headers.authorization || '').substring(7), SECRET)
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
          data: await this.service.find({ id: ctx.params.id })
        })
      } else {
        const { offset, limit, where, order } = app.$helpers.formatQuery(ctx.request.query)

        ctx.send({
          status: 200,
          data: {
            total: await this.service.count({ where }),
            items: await this.service.find({ offset, limit, where, order })
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
      const { bodies } = ctx.request.body

      ctx.send({
        status: 201,
        data: bodies
          ? await this.service.bulkCreate({ bodies })
          : await this.service.create({ body: ctx.request.body })
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
      ctx.send({ status: 204 })
    }

    /**
     * 删除
     * @returns {Promise}
     * @private
     */
    async _del (ctx) {
      await this.service.destroy({ id: ctx.params.id })
      ctx.send({ status: 204 })
    }
  }

  const controllerModule = require('../utils/load-module')(`${consts.DIRS.EXTENDS}/controller.js`)

  return controllerModule ? controllerModule(app, Controller) : Controller
}
