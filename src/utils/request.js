export default app => {
  const { $env } = app
  uni.$u.http.setConfig(config => {
    config.baseURL = $env.BASE_URL /* 根域名 */
    return config
  })
  uni.$u.http.interceptors.request.use(
    config => config,
    config => Promise.reject(config)
  )
  uni.$u.http.interceptors.response.use(
    response => {
      const { data } = response
      // 自定义参数
      const custom = response.config?.custom
      if (data.code !== 200) {
        if (custom.toast !== false) {
          uni.$u.toast(data.msg)
        }
        if (custom?.catch) {
          return Promise.reject(data)
        }
        return new Promise(() => {})
      }
      return data.data || {}
    },
    response => Promise.reject(response)
  )
}
