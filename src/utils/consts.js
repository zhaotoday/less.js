const path = require('path')

// Node.js 工作目录
const ROOT = process.cwd()

// URL 重写
const REWRITES = []

// 目录
const DIRS = {
  SRC: 'src',
  MIDDLEWARES: 'src/middlewares',
  ROUTER: 'src/router',
  PUBLIC: 'src/public',
  EXTENDS: 'src/extends',
  CONFIG: 'src/config',
  APP: 'src/app',
  MODELS: 'src/app/models',
  SERVICES: 'src/app/services',
  CONTROLLERS: 'src/app/controllers'
}

// 挂载规则
const LOAD_RULES = [{
  name: 'models',
  dir: path.resolve(DIRS.MODELS)
}, {
  name: 'services',
  dir: path.resolve(DIRS.SERVICES)
}, {
  name: 'controllers',
  dir: path.resolve(DIRS.CONTROLLERS)
}]

// 静态资源目录
const STATIC_DIR = path.resolve(DIRS.PUBLIC)

module.exports = {
  ROOT,
  REWRITES,
  DIRS,
  LOAD_RULES,
  STATIC_DIR
}
