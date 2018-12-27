const Schema = require('jugglingdb').Schema

module.exports = app => {
  const schema = new Schema('redis', {
    host: app.$config.REDIS.HOST,
    password: app.$config.REDIS.PASSWORD,
    port: app.$config.REDIS.PORT
  })

  return {
    Schema,
    defineModel (modelName, attributes) {
      const Model = schema.define(`${app.$config.REDIS.DB}:${modelName}`, attributes)

      Model.prototype.expiresIn = function (time) {
        schema.client.expire(`${app.$config.REDIS.DB}:${modelName}:${this.id}`, time / 1000)

        return this
      }

      return Model
    }
  }
}
