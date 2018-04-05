module.exports = app => {
  return class {
    constructor () {
      this.model = null
    }

    /**
     * 查询
     * @returns {Promise}
     */
    async find ({id = '', attributes = null, offset = 0, limit = 10, where = null, order = [['id', 'DESC']]} = {}) {
      if (id) {
        return this.model.findById(id)
      } else {
        return this.model.findAll({attributes, offset, limit, where, order})
      }
    }

    /**
     * 删除
     * @returns {Promise}
     */
    async destroy ({id}) {
      return this.model.destroy({
        where: {id}
      })
    }

    /**
     * 新增
     * @returns {Promise}
     */
    async create ({body = null} = {}) {
      return this.model.create(body)
    }

    /**
     * 更新
     * @returns {Promise}
     */
    async update ({id, body = null} = {}) {
      return this.model.update(body, {
        where: {id}
      })
    }

    /**
     * 获取记录总数
     * @returns {Promise}
     */
    async count ({where = null} = {}) {
      return this.model.count({where})
    }
  }
}
