const Koa = require('koa')
const app = new Koa()

require('./utils/init')(app)
require('./middlewares')(app)
require('./router')(app)

app.listen(app.$consts.PORT, () => {
  console.log(`server is running at http://localhost:${app.$consts.PORT}`)
})
