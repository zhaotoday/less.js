declare module 'koa-rewrite' {
  import type Koa from 'koa'

  export default function rewrite(from: string | RegExp, to: string): Koa.Middleware
}
