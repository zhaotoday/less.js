const consts = require('../utils/consts')

module.exports = app => {
  require('./register')({app, rules: consts.REGISTER_RULES})
}
