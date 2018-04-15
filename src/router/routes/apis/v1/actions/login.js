module.exports = (app, router) => {
  app.$resources(router, '/apis/v1/actions/login', app.$controllers.apis.v1.actions.login)
}
