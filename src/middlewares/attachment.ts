import send from 'koa-send'
import type { LessApp } from '../types'

/** 注入 `ctx.attachment`，用于以下载形式发送文件。 */
export function mountAttachment(app: LessApp) {
  app.use(async (ctx, next) => {
    ctx.attachment = async ({ fileName, filePath }) => {
      ctx.response.attachment(fileName)
      await send(ctx, filePath)
    }

    await next()
  })
}
