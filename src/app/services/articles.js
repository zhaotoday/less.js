module.exports = app => {
  return class extends app.Service {
    constructor () {
      super()

      this.model = app.models.articles
    }
  }
}
