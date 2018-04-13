module.exports = (app, router) => {
  router.get('/apis/v1/actions/login/sign', app.$controllers.apis.v1.actions.login.testSign)
  router.get('/apis/v1/actions/login/verify', app.$controllers.apis.v1.actions.login.testVerify)
}
