const fs = require('fs')
const path = require('path')

module.exports = filePath => {
  const file = path.resolve(filePath)

  return fs.existsSync(file)
    ? require(file)
    : fs.existsSync(`${file}.js`)
      ? require(`${file}.js`)
      : fs.existsSync(`${file}/index.js`)
        ? require(`${file}/index.js`)
        : null
}
