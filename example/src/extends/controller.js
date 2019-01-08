module.exports = (app, Controller) => {
  return class extends Controller {
    getSetting () {
      return app.$services.settings.find({ id: 1 })
    }

    async getGlobalData (ctx) {
      const { BASE_URL, CDN, PAGE_SIZE, STATIC_VERSION } = app.$config

      return {
        helpers: app.$helpers,
        utils: {
          time: app.$module('time'),
          cut: app.$module('cut')
        },
        consts: {
          PAGE_SIZE,
          BASE_URL,
          CDN: CDN + (ctx.isMobile ? '/m' : ''),
          STATIC_VERSION
        },
        setting: await this.getSetting()
      }
    }
  }
}
