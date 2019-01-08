module.exports = app => {
  return class extends app.$Service {
    constructor () {
      super()

      this.Model = app.$models.Articles
      this.hasOrder = true
    }
  }
}
