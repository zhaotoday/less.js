import { promisify } from 'node:util'
import jsonwebtoken from 'jsonwebtoken'

/** Promise based wrapper around jsonwebtoken. */
export function createJwtModule() {
  return {
    decode: jsonwebtoken.decode,
    sign: promisify(jsonwebtoken.sign) as (payload: string | object | Buffer, secret: string, options?: jsonwebtoken.SignOptions) => Promise<string>,
    verify: promisify(jsonwebtoken.verify) as (token: string, secret: string, options?: jsonwebtoken.VerifyOptions) => Promise<jsonwebtoken.JwtPayload | string>,
  }
}
