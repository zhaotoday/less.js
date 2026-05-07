import Koa from 'koa'
import type { LessApp, LessAppOptions } from './types'
import { mountExtensions } from './extends'
import { mountMiddlewares } from './middlewares'
import { createPaths } from './utils/paths'
import { mountRouter } from './utils/router'

export type {
  AttachmentPayload,
  BaseServiceContract,
  DatabaseConfig,
  LessApp,
  LessAppOptions,
  LessConfig,
  LessContext,
  LessHelpers,
  LessPaths,
  ResourceController,
  RewriteRule,
  SendPayload,
} from './types'

/** 创建并装配 Less.js Koa 应用。 */
export async function createApp(options: LessAppOptions = {}) {
  const root = options.root ?? process.cwd()
  const app = new Koa() as LessApp

  app.$root = root
  app.$env = options.env ?? process.env.NODE_ENV ?? 'development'
  app.$paths = createPaths(root)

  await mountExtensions(app)
  await mountMiddlewares(app)
  await mountRouter(app)

  return app
}

export default createApp
