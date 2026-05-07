import cors from '@koa/cors'
import type { LessApp } from '../types'

/** 在鉴权相关中间件之前安装 CORS。 */
export function mountCors(app: LessApp) {
  app.use(cors(app.$config.CORS))
}
