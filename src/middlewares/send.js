module.exports = app => {
  return async (ctx, next) => {
    ctx.response.send = json => {
      ctx.response.set('Content-Type', 'application/json')
      ctx.response.body = JSON.stringify(json)
    }

    await next()
  }
}
