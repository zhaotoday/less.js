module.exports = app => {
  return {
    /**
     * 格式化查询
     * @returns {Object}
     */
    formatQuery (query) {
      const {offset = 0, limit = 10, where = '{}', order = [['id', 'DESC']]} = query

      return {offset: +offset, limit: +limit, where: JSON.parse(where), order}
    }
  }
}
