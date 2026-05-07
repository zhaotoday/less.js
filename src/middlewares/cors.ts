import cors from '@koa/cors'
import type { LessApp } from '../types'

/** Installs CORS before authentication-sensitive middleware. */
export function mountCors(app: LessApp) {
  app.use(cors(app.$config.CORS))
}
