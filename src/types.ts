import type Router from '@koa/router'
import type Koa from 'koa'
import type { Sequelize } from 'sequelize'
import type * as SequelizeModule from 'sequelize'

/** 从用户应用模块加载到的构造函数或工厂函数导出。 */
export type AppModule<T> = T | { default: T }

/** 应用配置、辅助函数、模型、服务和控制器使用的工厂函数形状。 */
export type AppFactory<T> = (app: LessApp) => T | Promise<T>

/** 动态应用模块树使用的字符串键对象。 */
export type ModuleTree<T = unknown> = Record<string, T | ModuleTree<T>>

/** URL 重写规则接受的值。 */
export type RewriteRule = [from: string | RegExp, to: string]

/** 传递给 Sequelize 的数据库配置。 */
export interface DatabaseConfig {
  database: string
  username: string
  password?: string
  options?: ConstructorParameters<typeof Sequelize>[3]
}

/** 框架默认配置与 `src/config` 合并后的运行时配置。 */
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

/** 基于消费端应用根目录解析后的目录约定。 */
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

/** 创建 Less 应用时可传入的选项。 */
export interface LessAppOptions {
  /** 应用根目录，默认使用 `process.cwd()`。 */
  root?: string
  /** 环境名称，默认使用 `process.env.NODE_ENV || "development"`。 */
  env?: string
}

/** `ctx.send` 输出的标准响应结构。 */
export interface SendPayload<T = unknown> {
  status?: number
  error?: unknown
  data?: T
}

/** 附件下载辅助函数参数。 */
export interface AttachmentPayload {
  fileName: string
  filePath: string
}

/** Less 中间件注入到 Koa 上下文的扩展能力。 */
export interface LessContext {
  attachment: (payload: AttachmentPayload) => Promise<void>
  isMobile: boolean
  send: <T = unknown>(payload?: SendPayload<T>) => void
}

/** REST 资源路由注册所需的控制器基础形状。 */
export interface ResourceController {
  del?: Router.Middleware
  get?: Router.Middleware
  post?: Router.Middleware
  put?: Router.Middleware
  requiresAuth?: boolean
  verify?: (ctx: Koa.ParameterizedContext) => Promise<unknown>
}

/** 挂载 Less.js 运行时契约后的 Koa 应用实例。 */
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

/** `app.$helpers` 暴露的辅助函数集合。 */
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

/** 基础控制器依赖的服务层公共契约。 */
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
