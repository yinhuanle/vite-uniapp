import { refreshToken } from '@/api/login'
import envConfig from '@/common/config/config'
import {
  getToken,
  getRefreshToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken
} from '@/store'
import { logAli } from '@/utils/log'

const requestConfig = {
  baseUrl: envConfig.config.BASE_URL /* 根域名 */,
  timeout: 15 * 1000,
  headers: {
    'Accept-Language': 'zh-CN',
    // 公共用户域0909加
    Domain: envConfig.config.USER_DOMAIN
  }
}
let isFail = false
// 是否正在刷新的标记 -- 防止重复发出刷新token接口

let isRefreshing = false
// 调试refreshToken可通过控制台，编辑token
// 失效后同时发送请求的容器 -- 缓存接口
let subscribers: any[] = []
// 刷新 token 后, 将缓存的接口重新请求一次
function onAccessTokenFetched(newToken) {
  subscribers.forEach(callback => {
    callback(newToken)
  })
  // 清空缓存接口
  subscribers = []
}

// 添加缓存接口
function addSubscriber(callback: any) {
  subscribers.push(callback)
}

const myRequest = (options: any, resolve: any, reject: any) => {
  // logAli('options.url', options.url)

  const { baseUrl, headers, timeout } = requestConfig
  uni.request({
    method: options.method,
    url: `${baseUrl}${options.url}`,
    data: options.data,
    header: {
      ...headers,
      token: getToken(),
      'content-type': 'application/json'
    },
    timeout,
    success: (res: any) => {
      if (res.data.code === 200) {
        resolve(res.data)
      } else if (
        res.data.code === 403 &&
        !options.url.includes('rent/app/order/checkOnlineOrder')
      ) {
        if (!isRefreshing) {
          isRefreshing = true
          refreshToken(getRefreshToken())
            .then(
              (refreshRes: any) => {
                logAli('REQUEST--refreshRes:', refreshRes)
                setToken(refreshRes.data.accessToken.token)
                setRefreshToken(refreshRes.data.refreshToken.token)
                // 当刷新成功后, 重新发送缓存请求
                onAccessTokenFetched(res)
              },
              (fail: any) => {
                logAli('REQUEST--refreshToken---fail', JSON.stringify(fail))
                removeToken()
                removeRefreshToken()
                uni.reLaunch({
                  url: '/pages/login/login'
                })
              }
            )
            .finally(() => {
              isRefreshing = false
            })
        }

        // 将其他接口缓存起来
        addSubscriber(() => {
          // 用重新封装的config去请求, 就会将重新请求后的返回
          myRequest(options, resolve, reject)
        })
      } else {
        logAli('REQUEST--reject--error', JSON.stringify(res.data.msg))
        if (!options.url.includes('rent/app/order/checkOnlineOrder')) {
          uni.showToast({
            title: res.data.msg,
            duration: 3 * 1000,
            icon: 'error'
          })
        }

        // reject(new Error(res.code || res.data?.code))
        // 返回错误码、错误信息
        reject(res.data || res)
      }
    },
    fail: (err: any) => {
      logAli('REQUEST--service--fail', JSON.stringify(err))
      uni.getNetworkType({
        success(res) {
          if (!isFail) {
            isFail = true
            if (res.networkType == 'none') {
              uni.showToast({
                title: '网络异常，请稍后重试',
                icon: 'error'
              })
              return
            }
            uni.showToast({
              title: '服务异常，请稍后重试',
              icon: 'error'
            })
          }
        },
        complete: () => {
          setTimeout(() => {
            isFail = false
          }, 15 * 1000)
        }
      })

      reject(new Error(err))
    },
    complete: () => {
      // uni.hideLoading()
    }
  })
}

export default function request(options: any) {
  return new Promise((resolve, reject) => {
    myRequest(options, resolve, reject)
  })
}
