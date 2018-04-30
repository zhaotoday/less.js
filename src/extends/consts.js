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

// 注册规则
const REGISTER_RULES = [{
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
const DB = {
  database: 'hzzww0n',
  username: 'hzzww0n_f',
  password: 'aaaaaa111111',
  options: {
    host: 'wvort936.669.dnstoo.com',
    port: 4024,
    dialect: 'mysql',
    define: {
      underscored: true
    }
  }
}

// Redis 配置
const REDIS = {}

// 静态资源目录
const STATIC_DIR = path.resolve(ROOT, DIRS.PUBLIC)

// JWT 配置
const JWT = {
  secret: 'jwt_secret',
  expiresIn: '5h'
}

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
    REGISTER_RULES,
    DB,
    REDIS,
    STATIC_DIR,
    JWT,
    CORS
  }, constsModule ? constsModule(app) : null)
}
