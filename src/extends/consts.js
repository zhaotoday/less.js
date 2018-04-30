const path = require('path')

// Node.js 工作目录
const ROOT = process.cwd()

// 监听端口
const PORT = 3000

// 分页大小
const PAGE_SIZE = 10

// 目录
const DIRS = {
  SRC: 'src',
  MIDDLEWARES: 'src/middlewares',
  ROUTER: 'src/router',
  PUBLIC: 'src/public',
  EXTENDS: 'src/extends',
  APP: 'src/app',
  MODELS: 'src/app/models',
  SERVICES: 'src/app/services',
  CONTROLLERS: 'src/app/controllers',
  VIEWS: 'src/app/views'
}

// EJS 模板
const VIEWS = {
  root: path.resolve(ROOT, DIRS.VIEWS),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
}

// 挂载规则
const LOAD_RULES = [{
  name: 'models',
  dir: path.resolve(ROOT, DIRS.MODELS)
}, {
  name: 'services',
  dir: path.resolve(ROOT, DIRS.SERVICES)
}, {
  name: 'controllers',
  dir: path.resolve(ROOT, DIRS.CONTROLLERS)
}]

// MySQL 数据库配置
const DB = {}

// Redis 配置
const REDIS = {}

// 静态资源目录
const STATIC_DIR = path.resolve(ROOT, DIRS.PUBLIC)

// JWT 配置
const JWT = {}

// CORS 跨域配置
const CORS = {
  origin: '*',
  allowMethods: 'HEAD,GET,POST,PUT,PATCH,DELETE',
  allowHeaders: 'Content-Type,Authorization'
}

module.exports = app => {
  const constsModule = require('../utils/loadModule')(`${DIRS.EXTENDS}/consts.js`)

  return Object.assign({
    ROOT,
    PORT,
    PAGE_SIZE,
    DIRS,
    VIEWS,
    LOAD_RULES,
    DB,
    REDIS,
    STATIC_DIR,
    JWT,
    CORS
  }, constsModule ? constsModule(app) : null)
}
