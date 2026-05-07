import type { LessApp } from '../types'

/** 注入 `ctx.send`，用于输出 Less.js 标准响应结构。 */
export function mountSend(app: LessApp) {
  app.use(async (ctx, next) => {
    ctx.send = ({ status = 200, error = null, data = null } = {}) => {
      ctx.response.status = status
      ctx.response.body = { error, data }
    }

    await next()
  })
}
