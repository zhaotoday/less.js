const consts = require('../utils/consts')

// APP KEYS
const APP_KEYS = {}

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

// 短信
const SMS = {}

// 推送
const PUSH = {}

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
    APP_KEYS,
    JWT,
    CORS,
    DB,
    SMS,
    PUSH,
    SESSION
  }, configModule ? configModule(app) : null)
}
