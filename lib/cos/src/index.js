const promisify = require('pify')
const COS = require('cos-nodejs-sdk-v5')

module.exports = config => {
  const { SECRET_ID, SECRET_KEY } = config
  const cos = new COS({
    SecretId: SECRET_ID,
    SecretKey: SECRET_KEY
  })

  return promisify(cos)
}
