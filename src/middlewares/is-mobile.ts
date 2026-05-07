import MobileDetect from 'mobile-detect'
import type { LessApp } from '../types'

/** Adds `ctx.isMobile` based on the request user-agent. */
export function mountIsMobile(app: LessApp) {
  app.use(async (ctx, next) => {
    const md = new MobileDetect(ctx.request.headers['user-agent'] || '')
    ctx.isMobile = Boolean(md.mobile())

    await next()
  })
}
