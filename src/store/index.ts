import { defineStore } from 'pinia'
// import { IObject } from '@/utils/types/interface'

const tokenKey = 'token'
const refreshTokenKey = 'refreshToken'

export const useAppStore = defineStore('useAppStore', {
  state: () => ({
    state: {
      bindPage: '', // 小程序绑车后要下发一次开机指令，解绑前要下发一次关机指令。
      goodsDetailData: {}, // 商品详情数据
      inParkingAreaFlag: null, // 是否在停车区
      deviceData: {}, // 设备信息
      deviceLocationData: {}, // 设备位置信息
      statusTime: '', // 设备状态时间
      appIsLogin: false, // 是否登录
      appIsReady: false, // app数据是否就绪
      appIsRender: false, // app是否开始渲染内容
      permissions: [], // 权限集合
      activeName: 0,
      orderId: '', // 订单Id: 提交生成订单后赋值，重新扫码选套餐之前清掉
      oId: '', // 订单列表--带到订单详情
      isReal: '', // 订单--是否实体店
      user: {
        avatarUrl: '',
        nickName: '',
        code: '',
        gender: ''
      },

      userInfo: {}, // 用户信息

      isConnectBle: false // 蓝牙连接状态
    } as IObject
  }),
  actions: {
    updateState(data: IObject) {
      Object.keys(data).forEach((x: string) => {
        this.state[x] = data[x]
      })
    },
    // 退出
    logout() {
      this.updateState({
        permissions: [],
        user: {}
      })
    }
  }
})
/**
 * Token
 */
export function getToken() {
  return uni.getStorageSync(tokenKey)
}
export function setToken(token: string) {
  uni.setStorageSync(tokenKey, token)
}
export function removeToken() {
  uni.removeStorageSync(tokenKey)
}

/**
 * RefreshToken
 */
export function getRefreshToken() {
  return uni.getStorageSync(refreshTokenKey)
}
export function setRefreshToken(token: string) {
  uni.setStorageSync(refreshTokenKey, token)
}
export function removeRefreshToken() {
  uni.removeStorageSync(refreshTokenKey)
}
