const JPush = require('jpush-async/lib/JPush/JPushAsync')

module.exports = config => {
  const { APP_KEY, MASTER_SECRET } = config

  JPush.client = JPush.buildClient(APP_KEY, MASTER_SECRET)

  return JPush
}
