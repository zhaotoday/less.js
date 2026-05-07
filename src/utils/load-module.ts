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

/** Resolves a module path using Less.js application conventions. */
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

/** Dynamically imports an application module and unwraps its default export. */
export async function loadModule<T = unknown>(modulePath: string): Promise<T | null> {
  const resolved = await resolveModulePath(modulePath)

  if (!resolved)
    return null

  const mod = await import(pathToFileURL(resolved).href) as AppModule<T>
  return 'default' in Object(mod) ? (mod as { default: T }).default : mod as T
}
