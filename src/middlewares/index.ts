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

/** Installs the framework middleware stack and optional application middleware. */
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
