const rewrite = require('koa-rewrite')

module.exports = app => {
  const webRules = []
  const apiRules = [[/^\/v1\/(.*)/, '/api/v1/$1']]
  const { WEB = [], API = [] } = app.$config.REWRITES
  const allRules = [...webRules, ...apiRules, ...WEB, ...API]

  allRules.forEach(item => {
    app.use(rewrite.apply(null, item))
  })
}
