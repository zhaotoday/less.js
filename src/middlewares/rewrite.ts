import rewrite from 'koa-rewrite'
import type { LessApp } from '../types'

/** Installs URL rewrite rules from `app.$config.REWRITES`. */
export function mountRewrite(app: LessApp) {
  app.$config.REWRITES.forEach(([from, to]) => {
    app.use(rewrite(from, to))
  })
}
