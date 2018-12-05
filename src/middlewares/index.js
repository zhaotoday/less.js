const consts = require('../utils/consts')

module.exports = app => {
  require('./static')(app)
  require('./send')(app)
  // 处理错误
  require('./errors')(app)
  // cors 一定要在 jwt 之前，否则 options 请求返回 401
  require('./cors')(app)
  require('./jwt')(app)
  require('./body')(app)
  require('./views')(app)
  require('./isMobile')(app)
  require('./session')(app)

  const middlewaresModule = require('../utils/loadModule')(`${consts.DIRS.MIDDLEWARES}/index.js`)
  middlewaresModule && middlewaresModule(app)
}
