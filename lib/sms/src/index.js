const QcloudSms = require('qcloudsms_js')

module.exports = config => {
  const { APP_ID, APP_KEY } = config
  return QcloudSms(APP_ID, APP_KEY)
}
