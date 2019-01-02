const Schema = require('jugglingdb').Schema

module.exports = app => {
  const { HOST, PASSWORD, DB, PORT } = app.$config.REDIS
  const schema = new Schema('redis', {
    host: HOST,
    password: PASSWORD,
    port: PORT
  })

  return {
    Schema,
    defineModel (modelName, attributes) {
      const Model = schema.define(`${DB}:${modelName}`, attributes)

      Model.prototype.expiresIn = function (time) {
        schema.client.expire(`${DB}:${modelName}:${this.id}`, time / 1000)

        return this
      }

      return Model
    }
  }
}
