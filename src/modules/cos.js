const COS = require('cos-nodejs-sdk-v5')

module.exports = app => {
  const promisify = require('./promisify')(app)
  const cos = new COS({
    SecretId: app.$config.COS.SECRET_ID,
    SecretKey: app.$config.COS.SECRET_KEY
  })

  return promisify(cos)
}
