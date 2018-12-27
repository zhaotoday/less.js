const consts = require('../utils/consts')

module.exports = app => {
  return async () => {
    const initializeModule = require('../utils/load-module')(`${consts.DIRS.EXTENDS}/initialize.js`)

    if (initializeModule) {
      await initializeModule(app)
    }
  }
}
