// #ifdef H5
// import envConfig from '@/static/h5/config.js'

// const { env } = process
// #endif

import envConfig from './alipay/config.js'
// uni.showToast({
//   title: envConfig.BASE_URL
// })
// #ifdef MP-WEIXIN
// import envConfig from '@/static/mp-weixin/config.js'
// #endif

// 运行的平台
const RUNTIME_PLATFORM = uni.$u.platform
// 运行的系统
const OS_SYSTEM = uni.$u.os()
export default {
  install(app) {
    app.$env = {
      // 公共参数
      APP_NAME: '',
      VERSION: '1.0.0',
      RUNTIME_PLATFORM,
      OS_SYSTEM,
      // 环境变量
      // ...env,
      // 平台参数
      ...envConfig
    }
  }
}
