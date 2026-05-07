import rewrite from 'koa-rewrite'
import type { LessApp } from '../types'

/** 安装 `app.$config.REWRITES` 中配置的 URL 重写规则。 */
export function mountRewrite(app: LessApp) {
  app.$config.REWRITES.forEach(([from, to]) => {
    app.use(rewrite(from, to))
  })
}
