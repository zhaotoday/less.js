module.exports = (app, router) => {
  router.get('/articles', app.$controllers.articles.index)
}
