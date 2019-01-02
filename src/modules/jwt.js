module.exports = app => {
  const promisify = require('./promisify')(app)
  const jwt = require('jsonwebtoken')

  return promisify(jwt)
}
