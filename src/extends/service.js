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
    async find ({ id = '', include = null, attributes = null, offset = 0, limit = app.$config.PAGE_SIZE || 10, group = null, where = {}, order = [['id', 'DESC']] } = {}) {
      include = include
        ? include.map(item => ({
          ...item,
          model: typeof item.model === 'string'
            ? app.$models[item.model]
            : item.model,
          as: item.as,
        }))
        : null

      if (id) {
        return this.Model.findByPk(id, {
          include: include || this.include,
          attributes
        })
      } else {
        if (this.hasOrder && JSON.stringify(order) === JSON.stringify([['id', 'DESC']])) {
          order = [['order', 'DESC']]
        }
        return this.Model.findAll({
          include: include || this.include,
          attributes,
          offset,
          limit: limit === -1 ? undefined : limit,
          group,
          where,
          order
        })
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
    async destroy ({ id } = {}) {
      const where = id.includes(',')
        ? {
          id: { $in: id.split(',') }
        }
        : { id }

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
     * 批量新增
     * @returns {Promise}
     */
    bulkCreate ({ bodies = [] } = {}) {
      return this.Model.bulkCreate(bodies)
    }

    /**
     * 更新
     * @returns {Promise}
     */
    async update ({ id, body = null, where } = {}) {
      return this.Model.update(body, {
        where: id ? { id } : where
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
