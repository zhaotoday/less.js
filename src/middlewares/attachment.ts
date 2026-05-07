import send from 'koa-send'
import type { LessApp } from '../types'

/** Adds `ctx.attachment` for sending files as downloads. */
export function mountAttachment(app: LessApp) {
  app.use(async (ctx, next) => {
    ctx.attachment = async ({ fileName, filePath }) => {
      ctx.response.attachment(fileName)
      await send(ctx, filePath)
    }

    await next()
  })
}
