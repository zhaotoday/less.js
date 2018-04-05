const consts = require('./utils/consts')
const Koa = require('koa')
const app = new Koa()

require('./utils/init')(app)
require('./router')(app)
require('./middlewares')(app)

app.listen(consts.PORT, () => {
  console.log('server is running at http://localhost:3000')
})
