module.exports = app => {
  return class extends require('./base')(app) {
    constructor () {
      super()

      this.service = app.$services.wxUsers
      this.addMethods(['get', 'post', 'put', 'del'])
    }
  }
}
