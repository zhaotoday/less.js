import { access } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { AppModule } from '../types'

const CANDIDATE_EXTENSIONS = ['', '.js', '.mjs', '.cjs']

async function exists(path: string) {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

/** 按 Less.js 应用约定解析模块路径。 */
export async function resolveModulePath(modulePath: string) {
  const absolute = resolve(modulePath)
  const candidates = extname(absolute)
    ? [absolute]
    : [
        ...CANDIDATE_EXTENSIONS.map(extension => `${absolute}${extension}`),
        ...CANDIDATE_EXTENSIONS.filter(Boolean).map(extension => resolve(absolute, `index${extension}`)),
      ]

  for (const candidate of candidates) {
    if (await exists(candidate))
      return candidate
  }

  return null
}

/** 动态导入应用模块，并自动解包默认导出。 */
export async function loadModule<T = unknown>(modulePath: string): Promise<T | null> {
  const resolved = await resolveModulePath(modulePath)

  if (!resolved)
    return null

  const mod = await import(pathToFileURL(resolved).href) as AppModule<T>
  return 'default' in Object(mod) ? (mod as { default: T }).default : mod as T
}
