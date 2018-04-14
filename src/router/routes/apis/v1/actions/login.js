module.exports = (app, router) => {
  app.$resources(router, '/apis/v1/actions/login', app.$controllers.apis.v1.actions.login)
  router.get('/apis/v1/actions/login/verify', app.$controllers.apis.v1.actions.login.verify)
}
