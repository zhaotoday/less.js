const consts = require('../utils/consts')

module.exports = app => {
  require('./static')(app)
  require('./send')(app)
  // 处理错误
  require('./errors')(app)
  // cors 一定要在 jwt 之前，否则 options 请求返回 401
  require('./cors')(app)
  require('./body')(app)
  require('./is-mobile')(app)
  require('./rewrite')(app)
  require('./attachment')(app)
  require('./redirect')(app)

  const middlewaresModule = require('../utils/load-module')(`${consts.DIRS.MIDDLEWARES}/index.js`)
  middlewaresModule && middlewaresModule(app)
}
