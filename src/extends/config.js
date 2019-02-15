const consts = require('../utils/consts')

// JWT
const JWT = {}

// CORS
const CORS = {
  origin: '*',
  allowMethods: 'HEAD,GET,POST,PUT,PATCH,DELETE',
  allowHeaders: 'Content-Type,Authorization'
}

// 数据库
const DB = {}

module.exports = app => {
  const configModule = require('../utils/load-module')(`${consts.DIRS.CONFIG}/index.js`)
  return Object.assign({ JWT, CORS, DB }, configModule ? configModule(app) : null)
}
