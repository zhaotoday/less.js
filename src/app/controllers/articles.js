module.exports = {
  async index (ctx, next) {
    ctx.response.body = '<h1>HOME page</h1>'
  }
}
