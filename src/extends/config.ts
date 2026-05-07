import type { AppFactory, LessApp, LessConfig } from '../types'
import { loadModule } from '../utils/load-module'

const defaultConfig: LessConfig = {
  CORS: {
    origin: '*',
    allowMethods: 'HEAD,GET,POST,PUT,PATCH,DELETE',
    allowHeaders: 'Content-Type,Authorization',
  },
  DB: undefined,
  JWT: {},
  REWRITES: [],
}

/** 加载并合并 `src/config` 中的应用配置。 */
export async function loadConfig(app: LessApp): Promise<LessConfig> {
  const configFactory = await loadModule<AppFactory<LessConfig>>(`${app.$paths.config}/index`)
  const userConfig = configFactory ? await configFactory(app) : {}

  return {
    ...defaultConfig,
    ...userConfig,
    CORS: {
      ...defaultConfig.CORS,
      ...userConfig.CORS,
    },
    JWT: {
      ...defaultConfig.JWT,
      ...userConfig.JWT,
    },
    REWRITES: userConfig.REWRITES ?? defaultConfig.REWRITES,
  }
}
