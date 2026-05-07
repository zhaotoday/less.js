import { createApp } from 'less.js'

const app = await createApp()

await app.$initialize()

app.listen(app.$config.PORT, () => {
  console.log(`server is running at http://localhost:${app.$config.PORT}`)
})
