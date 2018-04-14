module.exports = app => {
  // cors 一定要在 jwt 之前，否则 options 请求返回 401
  require('./cors')(app)
  require('./send')(app)
  require('./jwt')(app)
  require('./static')(app)
  require('./bodyparser')(app)
}
