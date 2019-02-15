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

// SESSION
const SESSION = {
  key: 'koa:sess',
  maxAge: 600000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}

module.exports = app => {
  const configModule = require('../utils/load-module')(`${consts.DIRS.CONFIG}/index.js`)

  return Object.assign({
    JWT,
    CORS,
    DB,
    SESSION
  }, configModule ? configModule(app) : null)
}
