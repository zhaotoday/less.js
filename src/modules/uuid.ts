import { randomUUID } from 'node:crypto'

/** Creates a RFC 4122 UUID using Node's native crypto implementation. */
export function createUuidModule() {
  return randomUUID()
}
