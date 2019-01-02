const QcloudSms = require('qcloudsms_js')

module.exports = app => {
  const { APP_ID, APP_KEY } = app.$config.SMS
  return QcloudSms(APP_ID, APP_KEY)
}
