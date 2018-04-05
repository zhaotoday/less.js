const path = require('path')

const PORT = 3000

const REGISTER_RULES = [{
  name: 'controllers',
  path: path.join(__dirname, '../app/controllers')
}, {
  name: 'services',
  path: path.join(__dirname, '../app/services')
}, {
  name: 'models',
  path: path.join(__dirname, '../app/models')
}]

const DB = {}

const REDIS = {}

module.exports = {
  PORT,
  REGISTER_RULES,
  DB,
  REDIS
}
