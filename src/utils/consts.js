const path = require('path')

// Node.js 工作目录
const ROOT = process.cwd()

// 监听端口
const PORT = 3000

// 分页大小
const PAGE_SIZE = 10

// 目录
const DIRS = {
  MODELS: 'models',
  SERVICES: 'services',
  CONTROLLERS: 'controllers',
  VIEWS: 'views'
}

// EJS 模板
const VIEWS = {
  root: path.resolve(ROOT, `src/app/${DIRS.VIEWS}`),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
}

// 注册规则
const REGISTER_RULES = [{
  name: DIRS.MODELS,
  dir: path.resolve(ROOT, `src/app/${DIRS.MODELS}`)
}, {
  name: DIRS.SERVICES,
  dir: path.resolve(ROOT, `src/app/${DIRS.SERVICES}`)
}, {
  name: DIRS.CONTROLLERS,
  dir: path.resolve(ROOT, `src/app/${DIRS.CONTROLLERS}`)
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
    },
    operatorsAliases: false
  }
}

// Redis 配置
const REDIS = {}

// 静态资源目录
const STATIC_DIR = path.resolve(ROOT, 'src/public')

// JWT 配置
const JWT = {
  secret: 'jwt_secret',
  expiresIn: '5h'
}

const CORS = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  allowHeaders: 'Content-Type,Authorization'
}

module.exports = {
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
}
