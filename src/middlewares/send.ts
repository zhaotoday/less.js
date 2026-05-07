import type { LessApp } from '../types'

/** Installs `ctx.send`, the standard Less.js response envelope helper. */
export function mountSend(app: LessApp) {
  app.use(async (ctx, next) => {
    ctx.send = ({ status = 200, error = null, data = null } = {}) => {
      ctx.response.status = status
      ctx.response.body = { error, data }
    }

    await next()
  })
}
