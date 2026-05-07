import type Router from '@koa/router'
import type Koa from 'koa'
import type { Sequelize } from 'sequelize'
import type * as SequelizeModule from 'sequelize'

/** Constructor or factory export loaded from a user application module. */
export type AppModule<T> = T | { default: T }

/** Function shape used by application config, helpers, models, services and controllers. */
export type AppFactory<T> = (app: LessApp) => T | Promise<T>

/** Plain object with string keys used by dynamic application trees. */
export type ModuleTree<T = unknown> = Record<string, T | ModuleTree<T>>

/** Value accepted by a rewrite rule. */
export type RewriteRule = [from: string | RegExp, to: string]

/** Database settings passed to Sequelize. */
export interface DatabaseConfig {
  database: string
  username: string
  password?: string
  options?: ConstructorParameters<typeof Sequelize>[3]
}

/** Runtime configuration merged from framework defaults and `src/config`. */
export interface LessConfig {
  CORS: Record<string, unknown>
  DB?: DatabaseConfig
  JWT?: {
    SECRET?: string
    EXPIRES_IN?: string | number
  }
  PAGE_SIZE?: number
  REDIS?: Record<string, unknown>
  REWRITES: RewriteRule[]
  [key: string]: unknown
}

/** Resolved application directories relative to the consuming app root. */
export interface LessPaths {
  root: string
  src: string
  middlewares: string
  router: string
  public: string
  extends: string
  config: string
  app: string
  models: string
  services: string
  controllers: string
}

/** Options used when creating a Less application. */
export interface LessAppOptions {
  /** Application root. Defaults to `process.cwd()`. */
  root?: string
  /** Environment name. Defaults to `process.env.NODE_ENV || "development"`. */
  env?: string
}

/** Standard response envelope emitted by `ctx.send`. */
export interface SendPayload<T = unknown> {
  status?: number
  error?: unknown
  data?: T
}

/** Attachment helper options. */
export interface AttachmentPayload {
  fileName: string
  filePath: string
}

/** Extended Koa context helpers installed by Less middleware. */
export interface LessContext {
  attachment: (payload: AttachmentPayload) => Promise<void>
  isMobile: boolean
  send: <T = unknown>(payload?: SendPayload<T>) => void
}

/** Base shape expected by resource route registration. */
export interface ResourceController {
  del?: Router.Middleware
  get?: Router.Middleware
  post?: Router.Middleware
  put?: Router.Middleware
  requiresAuth?: boolean
  verify?: (ctx: Koa.ParameterizedContext) => Promise<unknown>
}

/** Koa app enriched with Less.js runtime contracts. */
export interface LessApp extends Koa {
  $config: LessConfig
  $controllers: ModuleTree<ResourceController>
  $Controller: abstract new (...args: unknown[]) => ResourceController
  $env: string
  $helpers: LessHelpers
  $initialize: () => Promise<void>
  $model: Sequelize | null
  $models: ModuleTree
  $module: <T = unknown>(moduleName: string) => Promise<T>
  $paths: LessPaths
  $require: <T = unknown>(modulePath: string) => Promise<T | null>
  $resources: (router: Router, path: string, controller: ResourceController) => void
  $root: string
  $Sequelize: typeof SequelizeModule
  $Service: abstract new (...args: unknown[]) => BaseServiceContract
  $services: ModuleTree
}

/** Helper methods available at `app.$helpers`. */
export interface LessHelpers {
  formatQuery: (query: Record<string, unknown>) => {
    attributes: unknown
    group: unknown
    include: unknown
    limit: number | undefined
    offset: number
    order: unknown
    where: Record<PropertyKey, unknown>
  }
  random: (length: number) => string
  sleep: (duration: number) => Promise<void>
  [key: string]: unknown
}

/** Shared service contract used by the base controller. */
export interface BaseServiceContract {
  bulkCreate: (options?: { bodies?: unknown[] }) => Promise<unknown>
  count: (options?: { where?: Record<PropertyKey, unknown> }) => Promise<number>
  create: (options?: { body?: unknown }) => Promise<unknown>
  destroy: (options?: { id: string }) => Promise<unknown>
  find: (options?: Record<string, unknown>) => Promise<unknown>
  update: (options?: { body?: unknown, id?: string, where?: Record<PropertyKey, unknown> }) => Promise<unknown>
}

declare module 'koa' {
  interface BaseContext extends LessContext {}

  interface Request {
    body?: unknown
  }
}
