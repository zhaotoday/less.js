const rewrite = require('koa-rewrite')

module.exports = app => {
  (app.$config.REWRITES || []).forEach(item => {
    app.use(rewrite(item[0], item[1]))
  })
}
