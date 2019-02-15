// 监听端口
const PORT = 3002

// 前端资源 CDN 地址
const CDN = `http://localhost:${PORT}`
// const CDN = 'https://api.cmsx.cn'

// JWT
const JWT = {
  ADMIN: {
    SECRET: 'cmsxTWuglrEgY^^q3m)5',
    EXPIRES_IN: '90d'
  },
  WX: {
    SECRET: 'cmsxTWuglrEgY^^q3m)5',
    EXPIRES_IN: '90d'
  }
}

// 数据库
const DB = {
  database: 'cmsx-dev',
  username: 'root',
  password: 'cmsxV3lFXZQ8@Yv^aSUK',
  options: {
    host: 'cdb-pf8wjch9.gz.tencentcdb.com',
    port: 10020,
    dialect: 'mysql',
    define: {
      underscored: false
    }
  }
}

// 小程序
const MP = {
  appid: '',
  secret: ''
}

module.exports = {
  PORT,
  CDN,
  JWT,
  DB,
  MP
}
