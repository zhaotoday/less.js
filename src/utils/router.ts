import Router from '@koa/router'
import { readdir } from 'node:fs/promises'
import { basename, extname, join, relative } from 'node:path'
import type { AppFactory, LessApp, ModuleTree, ResourceController } from '../types'
import { formatRouteURL } from './helpers'
import { loadModule } from './load-module'

async function readDirSafe(dir: string) {
  try {
    return await readdir(dir, { withFileTypes: true })
  }
  catch {
    return []
  }
}

async function loadControllers(app: LessApp, router: Router, dir: string): Promise<ModuleTree<ResourceController>> {
  const target: ModuleTree<ResourceController> = {}
  const files = await readDirSafe(dir)

  for (const file of files) {
    const filePath = join(dir, file.name)
    const extension = extname(file.name)
    const key = basename(file.name, extension)

    if (file.isDirectory()) {
      target[key] = await loadControllers(app, router, filePath)
      continue
    }

    if (!['.js', '.mjs', '.cjs'].includes(extension))
      continue

    const factory = await loadModule<AppFactory<new () => ResourceController>>(filePath)

    if (!factory)
      continue

    const Controller = await factory(app)
    const controller = new Controller()
    const routePath = `/${relative(app.$paths.controllers, filePath).replace(extension, '').replace(/\\/g, '/')}`

    app.$resources(router, formatRouteURL(routePath), controller)
    target[key] = controller
  }

  return target
}

/** 扫描应用控制器、挂载 REST 路由，并加载可选的自定义路由。 */
export async function mountRouter(app: LessApp) {
  const router = new Router()
  app.$controllers = await loadControllers(app, router, app.$paths.controllers)
  app.use(router.routes()).use(router.allowedMethods())

  const routerModule = await loadModule<AppFactory<void>>(`${app.$paths.router}/index`)

  if (routerModule)
    await routerModule(app)
}
