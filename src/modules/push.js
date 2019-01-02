const JPush = require('jpush-async/lib/JPush/JPushAsync')

module.exports = app => {
  const { APP_KEY, MASTER_SECRET } = app.$config.PUSH

  JPush.client = JPush.buildClient(APP_KEY, MASTER_SECRET)

  return JPush
}
