import MobileDetect from 'mobile-detect'
import type { LessApp } from '../types'

/** 根据请求 user-agent 注入 `ctx.isMobile`。 */
export function mountIsMobile(app: LessApp) {
  app.use(async (ctx, next) => {
    const md = new MobileDetect(ctx.request.headers['user-agent'] || '')
    ctx.isMobile = Boolean(md.mobile())

    await next()
  })
}
