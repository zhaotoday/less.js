module.exports = app => {
  return class extends app.$Controller {
    constructor () {
      super()

      this.requiresAuth = true
      this.jwtConfig = app.$config.JWT.ADMIN
    }
  }
}
