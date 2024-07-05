let config = {
  CURRENT_MODE: 'dev',
  BASE_URL: 'http://dev-scooter-api.iotomp.com/v2',
  MODE_CN: '测试环境ALIPAY',
  CONFIG_PLATFORM: 'DEV_ALIPAY'
}

// #ifdef H5-FAT
config = {
  CURRENT_MODE: 'product',
  BASE_URL: 'https://fat-scooter-api.iotomp.com/v2',
  MODE_CN: '测试环境',
  CONFIG_PLATFORM: 'H5-FAT'
}
// #endif

// #ifdef ALIPAY-TEST
config = {
  CURRENT_MODE: 'product',
  BASE_URL: 'https://fat-scooter-api.iotomp.com/v1',
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
