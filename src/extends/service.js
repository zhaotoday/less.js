module.exports = app => {
  class Service {
    constructor () {
      this.model = null
      this.hasOrder = false
    }

    /**
     * 查询
     * @returns {Promise}
     */
    async find ({ id = '', attributes = null, offset = 0, limit = 10, where = {}, order = [['id', 'DESC']] } = {}) {
      if (id) {
        return this.model.findById(id)
      } else {
        return this.model.findAll({ attributes, offset, limit, where, order })
      }
    }

    /**
     * 查询符合条件的上一条记录
     * @returns {Promise}
     */
    async findPrev ({ id = '', attributes = null, where = {}, order = [['id', 'DESC']] } = {}) {
      if (id) {
        where = { ...where, id: { $lt: id } }
      }

      return (await this.model.findAll({ attributes, limit: 1, where, order }))[0] || null
    }

    /**
     * 查询符合条件的下一条记录
     * @returns {Promise}
     */
    async findNext ({ id = '', attributes = null, where = {} } = {}, order = [['id', 'ASC']]) {
      if (id) {
        where = { ...where, id: { $gt: id } }
      }

      return (await this.model.findAll({ attributes, limit: 1, where, order }))[0] || null
    }

    /**
     * 删除
     * @returns {Promise}
     */
    async destroy ({ id }) {
      return this.model.destroy({
        where: { id }
      })
    }

    /**
     * 新增
     * @returns {Promise}
     */
    async create ({ body = null } = {}) {
      if (this.hasOrder) {
        const findPrevRes = await this.findPrev()
        body = { ...body, order: findPrevRes ? findPrevRes.id + 1 : 1 }
      }

      return this.model.create(body)
    }

    /**
     * 更新
     * @returns {Promise}
     */
    async update ({ id, body = null } = {}) {
      return this.model.update(body, {
        where: { id }
      })
    }

    /**
     * 获取记录总数
     * @returns {Promise}
     */
    async count ({ where = {} } = {}) {
      return this.model.count({ where })
    }
  }

  const serviceModule = require('../utils/loadModule')(`${app.$consts.DIRS.EXTENDS}/service.js`)

  return serviceModule ? serviceModule(app, Service) : Service
}
