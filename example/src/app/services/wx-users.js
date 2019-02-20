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
      const userInfo = {
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
      // TODO: 加入锁机制
      let findRes = await this.find({
        where: {
          openId: {
            $eq: openId
          }
        }
      })

      if (!findRes.length) {
        // 不存在则新增用户
        await this.create({ body: userInfo })
      } else {
        // 存在则更新用户信息
        await this.update({ id: findRes[0].id, body: userInfo })
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
