const path = require('path')

// 提交到 git 时，一些敏感配置信息不提交
const secret = require('./secret')

// 监听端口
const PORT = 3000

// 分页大小
const PAGE_SIZE = 10

// 目录
const PATHS = {
  MODELS: 'models',
  SERVICES: 'services',
  CONTROLLERS: 'controllers'
}

// 注册规则
const REGISTER_RULES = [{
  name: PATHS.MODELS,
  path: path.join(__dirname, `../app/${PATHS.MODELS}`)
}, {
  name: PATHS.SERVICES,
  path: path.join(__dirname, `../app/${PATHS.SERVICES}`)
}, {
  name: PATHS.CONTROLLERS,
  path: path.join(__dirname, `../app/${PATHS.CONTROLLERS}`)
}]

// MySQL 数据库配置
const DB = secret.DB

// Redis 配置
const REDIS = {}

module.exports = {
  PORT,
  PAGE_SIZE,
  PATHS,
  REGISTER_RULES,
  DB,
  REDIS
}
