const fs = require('fs')
const path = require('path')

module.exports = filePath => {
  const file = path.resolve(filePath)
  return fs.existsSync(file) ? require(file) : null
}
