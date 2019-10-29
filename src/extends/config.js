const consts = require('../utils/consts')

// URL 重写
const REWRITES = []

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
  return Object.assign({ REWRITES, JWT, CORS, DB }, configModule ? configModule(app) : null)
}
