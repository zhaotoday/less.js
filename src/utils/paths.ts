import { resolve } from 'node:path'
import type { LessPaths } from '../types'

/** 根据应用根目录创建 Less.js 约定目录映射。 */
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
