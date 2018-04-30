module.exports = app => {
  const helpersModule = require('../utils/loadModule')('src/extends/helpers.js')

  return Object.assign({
    /**
     * 格式化查询
     * @returns {Object}
     */
    formatQuery (query) {
      const {offset = 0, limit = 10, where = '{}', order = [['id', 'DESC']]} = query

      return {offset: +offset, limit: +limit, where: JSON.parse(where), order}
    }
  }, helpersModule)
}
