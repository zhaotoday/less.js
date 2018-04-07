const consts = require('./utils/consts')
const Koa = require('koa')
const app = new Koa()

require('./utils/init')(app)
require('./middlewares')(app)
require('./router')(app)

app.listen(consts.PORT, () => {
  console.log(`server is running at http://localhost:${consts.PORT}`)
})
