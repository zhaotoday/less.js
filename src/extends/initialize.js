const consts = require('../utils/consts')

module.exports = app => {
  const initModule = require('../utils/load-module')(`${consts.DIRS.EXTENDS}/init.js`)

  if (initModule) {
    initModule(app)
  }
}
