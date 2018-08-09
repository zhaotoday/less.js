module.exports = app => {
  const initModule = require('../utils/loadModule')(`${app.$consts.DIRS.EXTENDS}/init.js`)

  if (initModule) {
    initModule(app)
  }
}
