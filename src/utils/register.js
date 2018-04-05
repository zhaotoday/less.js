const path = require('path')
const fs = require('fs')

module.exports = ({app, rules = []}) => {
  rules.forEach(rule => {
    const content = {}

    fs.readdirSync(rule.path).forEach(fileName => {
      const extname = path.extname(fileName)

      if (extname === '.js') {
        const basename = path.basename(fileName, extname)
        content[basename] = require(path.join(rule.path, fileName))
      }
    })

    app[rule.name] = content
  })
}
