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

/** Creates the default controller base class bound to the current app. */
export async function createControllerClass(app: LessApp) {
  const jwt = createJwtModule()

  abstract class Controller implements ResourceController {
    /** Service used by the default REST handlers. */
    service: BaseServiceContract | null = null

    /** Whether routes for this controller require JWT verification. */
    requiresAuth = false

    /** JWT config override. Defaults to `app.$config.JWT`. */
    jwtConfig = app.$config.JWT

    constructor() {
      bindPrototypeMethods(this)
    }

    /** Signs payload data with the controller JWT config. */
    sign(data: unknown) {
      const { SECRET, EXPIRES_IN } = this.jwtConfig ?? {}

      if (!SECRET)
        throw new Error('JWT.SECRET is not configured.')

      return jwt.sign({ data }, SECRET, EXPIRES_IN ? { expiresIn: EXPIRES_IN as any } : undefined)
    }

    /** Verifies the bearer token from the request Authorization header. */
    verify(ctx: ParameterizedContext) {
      const { SECRET } = this.jwtConfig ?? {}

      if (!SECRET)
        throw new Error('JWT.SECRET is not configured.')

      return jwt.verify((ctx.request.headers.authorization || '').substring(7), SECRET)
    }

    /** Adds REST methods that delegate to their underscored implementation. */
    addMethods(methods: Array<'get' | 'post' | 'put' | 'del'>) {
      methods.forEach((value) => {
        Object.defineProperty(this, value, {
          value: async (ctx: ParameterizedContext) => {
            await this[`_${value}`](ctx)
          },
        })
      })
    }

    /** Default GET handler for one record or a paginated list. */
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

    /** Default POST handler for one or many records. */
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

    /** Default PUT handler for one record. */
    async _put(ctx: ParameterizedContext) {
      this.assertService()
      await this.service.update({
        id: ctx.params.id,
        body: ctx.request.body,
      })
      ctx.send({ status: 204 })
    }

    /** Default DELETE handler for one or many comma-separated ids. */
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
