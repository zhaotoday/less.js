module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.service = app.$services.files
    }

    /**
     * 获取文件
     * @param {Object} ctx 上下文
     * @returns {Promise}
     */
    async get (ctx) {
      const findRes = await this.service.find({ id: ctx.params.id })

      ctx.response.redirect(`${app.$config.CDN}/files/${findRes.dir}/${findRes.uuid}.${findRes.ext}`)
    }
  }
}
