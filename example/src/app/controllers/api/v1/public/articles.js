module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.service = app.$services.articles
      this.addMethods(['get'])
    }
  }
}
