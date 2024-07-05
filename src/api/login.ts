import request from '@/utils/request'
/**
 * @description: 支付宝授权登录
 */
export const alipayAuthLogin = (data: Object) => {
  return request({
    url: '/enduser/app/user/alipayAuthLogin',
    method: 'post',
    data
  })
}
/**
 *  刷新token
 */
export function refreshToken(data: Object) {
  return request({
    url: '/enduser/app/user/refreshToken',
    data,
    method: 'PUT'
  })
}

/**
 * @description: 获取协议
 */
export const getProtocol = (data: Object) => {
  return request({
    url: '/system/app/privacyAgreement/getByAppFlag',
    method: 'get',
    data
  })
}
