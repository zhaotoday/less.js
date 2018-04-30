const fs = require('fs')
const path = require('path')

module.exports = (app, filePath) => {
  const file = path.resolve(app.$consts.ROOT, filePath)
  return fs.existsSync(file) ? require(file) : null
}
