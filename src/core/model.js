const consts = require('../utils/consts')
const {database, username, password, options} = consts.DB

module.exports = app => new app.$Sequelize(database, username, password, options)
