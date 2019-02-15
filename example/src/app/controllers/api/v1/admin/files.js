const fs = require('fs')

module.exports = app => {
  return class extends require('./base')(app) {
    constructor () {
      super()

      this.service = app.$services.files
    }

    async post (ctx) {
      const { name, path, type, size } = ctx.request.body.files.file
      const uuid = app.$module('uuid')
      const time = app.$module('time')
      const date = time.getDate()
      const reader = fs.createReadStream(path)
      const ext = name.split('.').pop()
      const saveDir = `${app.$consts.DIRS.PUBLIC}/files/${date}`
      const saveName = `${uuid}.${ext}`

      !fs.existsSync(saveDir) && fs.mkdirSync(saveDir)

      const writeStream = fs.createWriteStream(`${saveDir}/${saveName}`)

      // 可读流通过管道写入可写流
      reader.pipe(writeStream)

      ctx.send({
        status: 201,
        data: await this.service.create({
          body: { title: name, type, ext, size, uuid, dir: date }
        })
      })
    }
  }
}
