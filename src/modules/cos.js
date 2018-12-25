const COS = require('cos-nodejs-sdk-v5')
const promisify = require('./promisify')

module.exports = app => promisify(new COS({
  SecretId: app.$config.COS.SECRET_ID,
  SecretKey: app.$config.COS.SECRET_KEY
}))
