import serve from 'koa-static'
import type { LessApp } from '../types'

/** 从消费端应用的 `src/public` 目录提供静态文件服务。 */
export function mountStatic(app: LessApp) {
  app.use(serve(app.$paths.public))
}
