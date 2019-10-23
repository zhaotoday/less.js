const consts = require('../utils/consts')

module.exports = app => {
  const helpers = {
    /**
     * 格式化查询
     * @returns {Object}
     */
    formatQuery (query) {
      const {
        include = 'null',
        attributes = 'null',
        offset = 0,
        limit = app.$config.PAGE_SIZE || -1,
        group = 'null',
        where = '{}',
        order = JSON.stringify([['id', 'DESC']])
      } = query

      return {
        include: JSON.parse(include),
        attributes: JSON.parse(attributes),
        offset: +offset,
        limit: +limit === -1 ? undefined : +limit,
        group: JSON.parse(group),
        where: JSON.parse(where),
        order: JSON.parse(order)
      }
    },
    random (n) {
      let ret = ''

      for (let i = 0; i < n; i++) {
        ret += Math.floor(Math.random() * 10)
      }

      return ret
    },
    sleep (n) {
      return new Promise(resolve => {
        setTimeout(resolve, n)
      })
    }
  }

  const helpersModule = require('../utils/load-module')(`${consts.DIRS.EXTENDS}/helpers.js`)

  return Object.assign(helpers, helpersModule ? helpersModule(app) : null)
}
