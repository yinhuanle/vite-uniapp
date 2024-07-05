import * as dict from './dict'
import { getModelByString } from '@/utils/model'

// 获取字典值 通过字段名+key 获取到相应value的值
export default function getEnumValueByKey(enumName, key) {
  const dictList = getModelByString(dict, enumName) || []
  // const dictList = dict[enumName] || []
  // eslint-disable-next-line no-restricted-syntax
  for (const item of dictList) {
    const { dictKey } = item
    // 必须数据类型一致，防止类型不同也取值
    if (dictKey === key) {
      return item.dictValue
    }
  }
  return key
}
