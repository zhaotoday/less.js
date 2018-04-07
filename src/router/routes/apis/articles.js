module.exports = (app, router) => {
  router.get('/apis/v1/articles', app.$controllers.apis.v1.articles.index)
}
