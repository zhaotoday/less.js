const consts = require('../utils/consts')
const helpers = require('../utils/helpers')
const path = require('path')
const fs = require('fs')

module.exports = app => {
  // 递归
  function recurrence (rule, dir) {
    const target = {}

    fs.readdirSync(dir).forEach(file => {
      const extname = path.extname(file)
      const basename = helpers.toLowerCamelCase(path.basename(file, extname))

      if (extname === '.js') {
        // Model
        if (rule.name === 'models') {
          target[helpers.capitalize(basename)] = require(path.join(dir, file))(app)
        } else if (rule.name === 'services') { // Service
          target[basename] = new (require(path.join(dir, file))(app))()
        }
      } else {
        target[basename] = recurrence(rule, path.join(dir, file))
      }
    })

    return target
  }

  // 挂载 config 到 app
  app.$config = require('./config')(app)

  // 挂载 consts 到 app
  app.$consts = require('../utils/consts')

  // 挂载 helpers 到 app
  app.$helpers = require('./helpers')(app)

  // 挂载 module 到 app
  app.$module = require('./module')(app)

  // 挂载 resources 到 app
  app.$resources = require('./resources')

  // 挂载 Sequelize 到 app
  app.$Sequelize = require('sequelize')

  // 挂载 Sequelize 实例 model 到 app
  app.$model = require('./model')(app)

  // 挂载基类 Service、Controller 到 app
  app.$Service = require('./service')(app)
  app.$Controller = require('./controller')(app)

  // 挂载业务级 model、service、controller 到 app.$models、app.$services、app.$controllers
  consts.LOAD_RULES.forEach(rule => {
    app[`$${rule.name}`] = recurrence(rule, rule.dir)
  })

  // 挂载 initialize 到 app
  app.$initialize = require('./initialize')(app)

  // 挂载 require 到 app
  app.$require = require('./require')
}
