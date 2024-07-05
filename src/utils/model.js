import { isUndefined, isNull } from './type'

export const getModelByString = (data, str) => {
  if (isUndefined(data) || isNull(data) || str === '') {
    return data
  }
  const chains = str.split('.')
  const nextData = data[chains[0]]
  const nextStr = chains.slice(1).join('.')
  return getModelByString(nextData, nextStr)
}

export const setModelByString = (data, str, value) => {
  const chains = str.split('.')
  if (chains.length <= 1) {
    data[chains[0]] = value
    return data
  }
  if (!data[chains[0]]) {
    data[chains[0]] = {}
  }
  const nextData = data[chains[0]]
  const nextStr = chains.slice(1).join('.')
  return setModelByString(nextData, nextStr, value)
}
