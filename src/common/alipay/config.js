// eslint-disable-next-line import/no-mutable-exports
let config = {
  CURRENT_MODE: 'dev',
  BASE_URL: 'http://dev-scooter-api.iotomp.com/v2',
  MODE_CN: '测试环境ALIPAY',
  CONFIG_PLATFORM: 'DEV_ALIPAY'
}

// #ifdef ALIPAY-TEST
config = {
  CURRENT_MODE: 'product',
  BASE_URL: '',
  MODE_CN: '开发环境ALIPAY',
  CONFIG_PLATFORM: 'TEST_ALIPAY'
}
// #endif
// #ifdef ALIPAY-PRO
config = {
  CURRENT_MODE: 'product',
  BASE_URL: '',
  MODE_CN: '生产环境ALIPAY',
  CONFIG_PLATFORM: 'PRODUCT_ALIPAY'
}
// #endif

export default { config }
