import { randomUUID } from 'node:crypto'

/** 使用 Node 原生 crypto 创建 RFC 4122 UUID。 */
export function createUuidModule() {
  return randomUUID()
}
