module.exports = app => {
  const helpers = {
    /**
     * 格式化查询
     * @returns {Object}
     */
    formatQuery (query) {
      const {offset = 0, limit = 10, where = '{}', order = [['id', 'DESC']]} = query

      return {offset: +offset, limit: +limit, where: JSON.parse(where), order}
    }
  }

  const helpersModule = require('../utils/loadModule')(`${app.$consts.DIRS.EXTENDS}/helpers.js`)

  return Object.assign(helpers, helpersModule ? helpersModule(app) : null)
}
