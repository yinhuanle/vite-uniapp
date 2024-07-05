import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import { createPinia } from 'pinia'
import App from './App.vue'
import envConfig from './common/envConfig'
import getEnumValueByKey from './common/index'

import '@/static/iconfont/iconfont.css'
import '@/static/css/common.scss'

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.getEnumValueByKey = getEnumValueByKey
  const Pinia = createPinia()
  app.use(uviewPlus).use(envConfig).use(Pinia)
  return {
    app,
    Pinia
  }
}
