const consts = require('../utils/consts')

module.exports = app => {
  return () => {
    const initializeModule = require('../utils/load-module')(`${consts.DIRS.EXTENDS}/initialize.js`)

    if (initializeModule) {
      initializeModule(app)
    }

    return app
  }
}
