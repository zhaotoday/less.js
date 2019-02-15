module.exports = app => {
  const mp = require('mp-server')
  const auth = new mp.Auth(app.$config.MP)

  return class extends app.$Service {
    constructor () {
      super()

      this.Model = app.$models.WxUsers
    }

    async login ({ code, encryptedData, iv }) {
      const codeToSessionRes = await auth.codeToSession({ code })
      const {
        openId,
        unionId,
        nickName,
        gender,
        language,
        city,
        province,
        country,
        avatarUrl
      } = auth.decryptData({
        sessionKey: codeToSessionRes.session_key,
        encryptedData,
        iv
      })
      let findRes = await this.find({
        where: {
          openId: {
            $eq: openId
          }
        }
      })

      if (!findRes.length) {
        await this.create({
          body: {
            openId,
            unionId,
            nickName,
            gender,
            language,
            city,
            province,
            country,
            avatarUrl
          }
        })
      }

      findRes = await this.find({
        where: {
          openId: {
            $eq: openId
          }
        }
      })

      return findRes[0]
    }
  }
}
