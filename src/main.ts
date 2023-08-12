import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import envConfig from './common/envConfig'
import request from '@/utils/request'

import '@/static/iconfont/iconfont.css'
import '@/static/css/common.scss'

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus).use(envConfig)
  request(app)
  return {
    app
  }
}
