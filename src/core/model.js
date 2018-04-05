const consts = require('../utils/consts')
const Sequelize = require('sequelize')
const {database, username, password, options} = consts.DB

module.exports = () => new Sequelize(database, username, password, options)
