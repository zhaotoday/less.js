const COS = require('cos-nodejs-sdk-v5')

module.exports = app => {
  const { SECRET_ID, SECRET_KEY } = app.$config.COS
  const promisify = require('./promisify')(app)
  const cos = new COS({
    SecretId: SECRET_ID,
    SecretKey: SECRET_KEY
  })

  return promisify(cos)
}
