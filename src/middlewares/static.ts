import serve from 'koa-static'
import type { LessApp } from '../types'

/** Serves static files from the consuming application's `src/public` directory. */
export function mountStatic(app: LessApp) {
  app.use(serve(app.$paths.public))
}
