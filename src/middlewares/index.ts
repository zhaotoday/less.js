import type { AppFactory, LessApp } from '../types'
import { loadModule } from '../utils/load-module'
import { mountAttachment } from './attachment'
import { mountBody } from './body'
import { mountCors } from './cors'
import { mountErrors } from './errors'
import { mountIsMobile } from './is-mobile'
import { mountRewrite } from './rewrite'
import { mountSend } from './send'
import { mountStatic } from './static'

/** 安装框架中间件栈，并加载可选的应用自定义中间件。 */
export async function mountMiddlewares(app: LessApp) {
  mountStatic(app)
  mountSend(app)
  mountErrors(app)
  mountCors(app)
  mountBody(app)
  mountIsMobile(app)
  mountRewrite(app)
  mountAttachment(app)

  const middlewares = await loadModule<AppFactory<void>>(`${app.$paths.middlewares}/index`)

  if (middlewares)
    await middlewares(app)
}
