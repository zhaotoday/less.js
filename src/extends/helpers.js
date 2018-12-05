const consts = require('../utils/consts')

module.exports = app => {
  const helpers = {
    /**
     * 格式化查询
     * @returns {Object}
     */
    formatQuery (query) {
      const { offset = 0, limit = 10, where = '{}', order = JSON.stringify([['id', 'DESC']]) } = query

      return {
        offset: +offset,
        limit: +limit,
        where: (where => {
          let ret = {}

          Object.keys(where).forEach(key => {
            if (Object.keys(where[key]).length) {
              ret[key] = where[key]
            }
          })

          return ret
        })(JSON.parse(where)),
        order: JSON.parse(order)
      }
    },
    random (n) {
      let ret = ''

      for (let i = 0; i < n; i++) {
        ret += Math.floor(Math.random() * 10)
      }

      return ret
    }
  }

  const helpersModule = require('../utils/loadModule')(`${consts.DIRS.EXTENDS}/helpers.js`)

  return Object.assign(helpers, helpersModule ? helpersModule(app) : null)
}
