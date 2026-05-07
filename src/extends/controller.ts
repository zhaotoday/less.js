import type { ParameterizedContext } from 'koa'
import type { AppFactory, BaseServiceContract, LessApp, ResourceController } from '../types'
import { createJwtModule } from '../modules/jwt'
import { loadModule } from '../utils/load-module'

function bindPrototypeMethods(instance: object) {
  const prototype = Object.getPrototypeOf(instance)

  for (const key of Object.getOwnPropertyNames(prototype)) {
    if (key === 'constructor')
      continue

    const descriptor = Object.getOwnPropertyDescriptor(prototype, key)
    if (typeof descriptor?.value === 'function')
      Object.defineProperty(instance, key, { ...descriptor, value: descriptor.value.bind(instance) })
  }
}

/** 创建绑定到当前应用的默认控制器基类。 */
export async function createControllerClass(app: LessApp) {
  const jwt = createJwtModule()

  abstract class Controller implements ResourceController {
    /** 默认 REST 处理方法使用的服务实例。 */
    service: BaseServiceContract | null = null

    /** 当前控制器的路由是否需要 JWT 校验。 */
    requiresAuth = false

    /** JWT 配置覆盖项，默认使用 `app.$config.JWT`。 */
    jwtConfig = app.$config.JWT

    constructor() {
      bindPrototypeMethods(this)
    }

    /** 使用当前控制器的 JWT 配置签发载荷。 */
    sign(data: unknown) {
      const { SECRET, EXPIRES_IN } = this.jwtConfig ?? {}

      if (!SECRET)
        throw new Error('JWT.SECRET is not configured.')

      return jwt.sign({ data }, SECRET, EXPIRES_IN ? { expiresIn: EXPIRES_IN as any } : undefined)
    }

    /** 校验请求 `Authorization` 头中的 Bearer Token。 */
    verify(ctx: ParameterizedContext) {
      const { SECRET } = this.jwtConfig ?? {}

      if (!SECRET)
        throw new Error('JWT.SECRET is not configured.')

      return jwt.verify((ctx.request.headers.authorization || '').substring(7), SECRET)
    }

    /** 添加 REST 方法，并委托到对应的下划线内部实现。 */
    addMethods(methods: Array<'get' | 'post' | 'put' | 'del'>) {
      methods.forEach((value) => {
        Object.defineProperty(this, value, {
          value: async (ctx: ParameterizedContext) => {
            await this[`_${value}`](ctx)
          },
        })
      })
    }

    /** 默认 GET 处理方法，用于查询单条记录或分页列表。 */
    async _get(ctx: ParameterizedContext) {
      this.assertService()
      const { include, attributes, offset, limit, group, where, order } = app.$helpers.formatQuery(ctx.request.query)

      if (ctx.params.id) {
        ctx.send({
          status: 200,
          data: await this.service.find({ id: ctx.params.id, include, attributes }),
        })
      }
      else {
        ctx.send({
          status: 200,
          data: {
            total: await this.service.count({ where }),
            items: await this.service.find({ include, attributes, offset, limit, group, where, order }),
          },
        })
      }
    }

    /** 默认 POST 处理方法，用于创建单条或多条记录。 */
    async _post(ctx: ParameterizedContext) {
      this.assertService()
      const { bodies } = ctx.request.body as { bodies?: unknown[] }

      ctx.send({
        status: 201,
        data: bodies
          ? await this.service.bulkCreate({ bodies })
          : await this.service.create({ body: ctx.request.body }),
      })
    }

    /** 默认 PUT 处理方法，用于更新单条记录。 */
    async _put(ctx: ParameterizedContext) {
      this.assertService()
      await this.service.update({
        id: ctx.params.id,
        body: ctx.request.body,
      })
      ctx.send({ status: 204 })
    }

    /** 默认 DELETE 处理方法，用于删除单个 ID 或逗号分隔的多个 ID。 */
    async _del(ctx: ParameterizedContext) {
      this.assertService()
      await this.service.destroy({ id: ctx.params.id })
      ctx.send({ status: 204 })
    }

    private assertService(): asserts this is this & { service: BaseServiceContract } {
      if (!this.service)
        throw new Error('Controller.service is not configured.')
    }
  }

  const controllerFactory = await loadModule<AppFactory<typeof Controller>>(`${app.$paths.extends}/controller`)
  return controllerFactory ? await controllerFactory(app) : Controller
}
