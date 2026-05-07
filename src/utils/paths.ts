import { resolve } from 'node:path'
import type { LessPaths } from '../types'

/** Creates the conventional Less.js directory map for an application root. */
export function createPaths(root: string): LessPaths {
  const src = resolve(root, 'src')
  const app = resolve(src, 'app')

  return {
    root,
    src,
    middlewares: resolve(src, 'middlewares'),
    router: resolve(src, 'router'),
    public: resolve(src, 'public'),
    extends: resolve(src, 'extends'),
    config: resolve(src, 'config'),
    app,
    models: resolve(app, 'models'),
    services: resolve(app, 'services'),
    controllers: resolve(app, 'controllers'),
  }
}
