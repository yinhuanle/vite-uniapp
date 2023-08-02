const { http } = uni.$u
/**
 * @description: 列表
 */
export const orderList = (
  params: Object,
  config = {
    custom: {
      catch: true
    }
  }
) => http.get('/notice/systemNotice/getUnReadCount', params, config)