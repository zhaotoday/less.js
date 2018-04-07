const consts = require('./consts')
const path = require('path')
const fs = require('fs')

module.exports = ({app, rules = []}) => {
  function recurrence (rule, dir) {
    const target = {}

    fs.readdirSync(dir).forEach(file => {
      const extname = path.extname(file)
      const basename = path.basename(file, extname)

      if (extname === '.js') {
        // model 是一个类的实例，与 Service、Controller 分开处理
        target[basename] = rule.name === consts.DIRS.MODELS
          ? require(path.join(dir, file))(app)
          : new (require(path.join(dir, file))(app))()
      } else {
        target[basename] = recurrence(rule, path.join(dir, file))
      }
    })

    return target
  }

  // 注册 helpers 到 app
  app.helpers = require('./helpers')(app)

  // 注册 Sequelize 实例 model 到 app
  app.model = require('../core/model')(app)
  app.model.columns = require('./columns')

  // 注册基类 Service、Controller 到 app
  app.Service = require('../core/service')(app)
  app.Controller = require('../core/constroller')(app)

  // 注册业务级 model、service、controller 到 app.models、app.services、app.controllers
  rules.forEach(rule => {
    app[rule.name] = recurrence(rule, rule.dir)
  })
}
