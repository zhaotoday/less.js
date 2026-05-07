import { koaBody } from 'koa-body'
import type { LessApp } from '../types'

/** 安装 multipart 请求体解析中间件。 */
export function mountBody(app: LessApp) {
  app.use(koaBody({ multipart: true }))
}
