import { koaBody } from 'koa-body'
import type { LessApp } from '../types'

/** Installs multipart body parsing. */
export function mountBody(app: LessApp) {
  app.use(koaBody({ multipart: true }))
}
