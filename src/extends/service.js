const consts = require('../utils/consts')

module.exports = app => {
  class Service {
    constructor () {
      this.Model = null
      this.hasOrder = false
    }

    /**
     * 查询
     * @returns {Promise}
     */
    async find ({ id = '', attributes = null, offset = 0, limit = app.$config.PAGE_SIZE || 10, where = {}, order = [['id', 'DESC']] } = {}) {
      if (id) {
        return this.Model.findById(id)
      } else {
        if (this.hasOrder && JSON.stringify(order) === JSON.stringify([['id', 'DESC']])) {
          order = [['order', 'DESC']]
        }
        return this.Model.findAll({ attributes, offset, limit: limit === -1 ? undefined : limit, where, order })
      }
    }

    /**
     * 查询符合条件的上一条记录
     * @returns {Promise}
     */
    async findPrev ({ id = '', attributes = null, where = {}, order = [['order', 'ASC']] } = {}) {
      if (id) {
        where = { ...where, id: { $gt: id } }
      }
      return (await this.Model.findAll({ attributes, limit: 1, where, order }))[0] || null
    }

    /**
     * 查询符合条件的下一条记录
     * @returns {Promise}
     */
    async findNext ({ id = '', attributes = null, where = {} } = {}, order = [['order', 'DESC']]) {
      if (id) {
        where = { ...where, id: { $lt: id } }
      }

      return (await this.Model.findAll({ attributes, limit: 1, where, order }))[0] || null
    }

    /**
     * 删除
     * @returns {Promise}
     */
    async destroy ({ id, ids } = {}) {
      const where = id
        ? { id }
        : {
          id: { $in: ids.split(',') }
        }

      return this.Model.destroy({ where })
    }

    /**
     * 新增
     * @returns {Promise}
     */
    async create ({ body = null } = {}) {
      if (this.hasOrder) {
        const findPrevRes = await this.Model.findAll({
          limit: 1,
          order: [['id', 'desc']]
        })
        body = { ...body, order: findPrevRes[0] ? findPrevRes[0].id + 1 : 1 }
      }

      return this.Model.create(body)
    }

    /**
     * 更新
     * @returns {Promise}
     */
    async update ({ id, body = null } = {}) {
      return this.Model.update(body, {
        where: { id }
      })
    }

    /**
     * 获取记录总数
     * @returns {Promise}
     */
    async count ({ where = {} } = {}) {
      return this.Model.count({ where })
    }
  }

  const serviceModule = require('../utils/load-module')(`${consts.DIRS.EXTENDS}/service.js`)

  return serviceModule ? serviceModule(app, Service) : Service
}
