module.exports = (app, router) => {
  app.$resources(router, '/apis/v1/articles', app.$controllers.apis.v1.articles)
}
