const consts = require('./consts')
const path = require('path')
const fs = require('fs')

module.exports = ({app, rules = []}) => {
  // 注册 Sequelize 实例 model 到 app
  app.model = require('../core/model')(app)
  app.model.columns = require('./columns')

  // 注册基类 Service、Controller 到 app
  app.Service = require('../core/service')(app)
  app.Controller = require('../core/constroller')(app)

  // 注册业务级 model、service、controller 到 app.models、app.services、app.controllers
  rules.forEach(rule => {
    const content = {}

    fs.readdirSync(rule.path).forEach(fileName => {
      const extname = path.extname(fileName)

      if (extname === '.js') {
        const basename = path.basename(fileName, extname)

        // model 是一个类的实例，与 Service、Controller 分开处理
        content[basename] = rule.name === consts.PATHS.MODELS
          ? require(path.join(rule.path, fileName))(app)
          : new (require(path.join(rule.path, fileName))(app))()
      }
    })

    app[rule.name] = content
  })
}
