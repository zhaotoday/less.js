const JPush = require('jpush-async/lib/JPush/JPushAsync')

module.exports = app => {
  JPush.client = JPush.buildClient(app.$config.PUSH.APP_KEY, app.$config.PUSH.MASTER_SECRET)
  return JPush
}
