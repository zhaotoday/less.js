const app = require('less.js')

app.$initialize().then(() => {
  app.listen(app.$config.PORT, () => {
    console.log(`server is running at http://localhost:${app.$config.PORT}`)
  })
})
