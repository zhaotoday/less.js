const path = require('path')

// Node.js 工作目录
const ROOT = process.cwd()

// 监听端口
const PORT = 3000

// 分页大小
const PAGE_SIZE = 10

// 目录
const PATHS = {
  MODELS: 'models',
  SERVICES: 'services',
  CONTROLLERS: 'controllers',
  VIEWS: 'views'
}

// EJS 模板
const VIEWS = {
  root: path.resolve(ROOT, `src/app/${PATHS.VIEWS}`),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
}

// 注册规则
const REGISTER_RULES = [{
  name: PATHS.MODELS,
  path: path.resolve(ROOT, `src/app/${PATHS.MODELS}`)
}, {
  name: PATHS.SERVICES,
  path: path.resolve(ROOT, `src/app/${PATHS.SERVICES}`)
}, {
  name: PATHS.CONTROLLERS,
  path: path.resolve(ROOT, `src/app/${PATHS.CONTROLLERS}`)
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
const STATIC_PATH = path.resolve(ROOT, 'src/public')

module.exports = {
  ROOT,
  PORT,
  PAGE_SIZE,
  PATHS,
  VIEWS,
  REGISTER_RULES,
  DB,
  REDIS,
  STATIC_PATH
}
