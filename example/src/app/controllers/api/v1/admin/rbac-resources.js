module.exports = app => {
  return class extends require('./base')(app) {
    constructor () {
      super()

      this.service = app.$services.rbacResources
      this.addMethods(['get', 'post', 'put', 'del'])
    }
  }
}
