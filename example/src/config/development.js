// 监听端口
const PORT = 3002

// 基础地址
const BASE_URL = `http://localhost:${PORT}`

// 前端资源 CDN 地址，开发环境下配置成网站构建工具 dev 时的地址
const CDN = `http://localhost:${PORT}`

// JWT
const JWT = {
  ADMIN: {
    SECRET: 'cmsxTWuglrEgY^^q3m)5',
    EXPIRES_IN: '90d'
  }
}

// 数据库
const DB = {
  database: 'cmsx-dev',
  username: 'cmsx-dev',
  password: 'sEMaPmmNSBPdKr22',
  options: {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    define: {
      underscored: false
    }
  }
}

module.exports = {
  PORT,
  BASE_URL,
  CDN,
  JWT,
  DB
}
