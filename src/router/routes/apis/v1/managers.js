module.exports = (app, router) => {
  app.$resources(router, '/apis/v1/managers', app.$controllers.apis.v1.managers)
}
