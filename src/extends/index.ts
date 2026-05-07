import { readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import type { AppFactory, LessApp, ModuleTree } from '../types'
import { capitalize, toLowerCamelCase } from '../utils/helpers'
import { loadModule } from '../utils/load-module'
import { createControllerClass } from './controller'
import { loadConfig } from './config'
import { createHelpers } from './helpers'
import { createInitialize } from './initialize'
import { createModel } from './model'
import { createModuleLoader } from './module'
import { createRequire } from './require'
import { resources } from './resources'
import { createServiceClass } from './service'

type LoadKind = 'models' | 'services'

async function readDirSafe(dir: string) {
  try {
    return await readdir(dir, { withFileTypes: true })
  }
  catch {
    return []
  }
}

async function loadTree(app: LessApp, kind: LoadKind, dir: string): Promise<ModuleTree> {
  const target: ModuleTree = {}
  const files = await readDirSafe(dir)

  for (const file of files) {
    const filePath = join(dir, file.name)
    const extension = extname(file.name)
    const key = toLowerCamelCase(basename(file.name, extension))

    if (file.isDirectory()) {
      target[key] = await loadTree(app, kind, filePath)
      continue
    }

    if (!['.js', '.mjs', '.cjs'].includes(extension))
      continue

    if (kind === 'models') {
      const factory = await loadModule<AppFactory<unknown>>(filePath)
      if (factory)
        target[capitalize(key)] = await factory(app)
    }

    if (kind === 'services') {
      const factory = await loadModule<AppFactory<new () => unknown>>(filePath)
      if (factory) {
        const Service = await factory(app)
        target[key] = new Service()
      }
    }
  }

  return target
}

/** 将 Less.js 运行时扩展全部挂载到 Koa 应用实例上。 */
export async function mountExtensions(app: LessApp) {
  app.$config = await loadConfig(app)
  app.$helpers = await createHelpers(app)
  app.$module = createModuleLoader(app)
  app.$resources = resources
  app.$Sequelize = await import('sequelize')
  app.$model = createModel(app)
  app.$Service = await createServiceClass(app)
  app.$Controller = await createControllerClass(app)
  app.$models = await loadTree(app, 'models', app.$paths.models)
  app.$services = await loadTree(app, 'services', app.$paths.services)
  app.$controllers = {}
  app.$initialize = createInitialize(app)
  app.$require = createRequire(app)
}
