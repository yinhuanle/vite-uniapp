import { useAppStore } from '@/store'

const store = useAppStore()

export function logAli(str?: string, obj?: any) {
  const date = new Date()
  const year = date.getFullYear() // 获取当前年份，例如：2021
  const month = date.getMonth() + 1 // 获取当前月份，注意需要加1，例如：9
  const day = date.getDate() // 获取当前日期，例如：22
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const time = `${year}-${month}-${day}`
  // 获取 7 天前的日期
  const daysAgo: any[] = []
  for (let index = 1; index < 7; index++) {
    daysAgo.push(new Date(date.getTime() - index * 24 * 60 * 60 * 1000))
  }
  // 格式化日期为字符串--天前的日期，例如：2022-01-01
  // const formatDate = `${daysAgo.getFullYear()}-${daysAgo.getMonth() + 1}-${daysAgo.getDate()}`

  console.log(
    `${time} ${hours}:${minutes}:${seconds} ${str}${
      obj !== null && obj !== undefined ? JSON.stringify(obj) : ''
    }`
  )

  // const fs = my.getFileSystemManager()

  // fs.mkdirSync(`${my.env.USER_DATA_PATH}/${time}`)
  // // 是否有文件
  // const result = fs.accessSync(
  //   `${my.env.USER_DATA_PATH}/${time}/${
  //     store.state.userInfo.aepUserId + store.state.userInfo.nickname
  //   }.txt`
  // )
  // if (result.error === 10022) {
  //   fs.writeFile({
  //     filePath: `${my.env.USER_DATA_PATH}/${time}/${
  //       store.state.userInfo.aepUserId + store.state.userInfo.nickname
  //     }.txt`,
  //     data: `--${time}:start--`,
  //     encoding: 'utf-8',
  //     success(res: any) {
  //       // console.log(res)
  //     },
  //     fail(err: any) {
  //       fs.writeFileSync(
  //         `${my.env.USER_DATA_PATH}/${time}/${
  //           store.state.userInfo.aepUserId + store.state.userInfo.nickname
  //         }.txt`,
  //         `--${time}:start--`,
  //         'utf-8'
  //       )
  //     }
  //   })
  //   // 删除7天前log
  //   daysAgo.forEach((element: any) => {
  //     const formatDate = `${element.getFullYear()}-${element.getMonth() + 1}-${element.getDate()}`
  //     fs.unlinkSync(`${my.env.USER_DATA_PATH}/${formatDate}/NaN.txt`)
  //     fs.unlinkSync(`${my.env.USER_DATA_PATH}/${formatDate}/null.txt`)
  //     fs.unlinkSync(`${my.env.USER_DATA_PATH}/${formatDate}/undefined.txt`)
  //     fs.unlinkSync(
  //       `${my.env.USER_DATA_PATH}/${formatDate}/${
  //         store.state.userInfo.aepUserId + store.state.userInfo.nickname
  //       }.txt`
  //     )
  //     fs.rmdirSync(`${my.env.USER_DATA_PATH}/${formatDate}`)
  //   })

  //   return
  // }
  // fs.appendFile({
  //   filePath: `${my.env.USER_DATA_PATH}/${time}/${
  //     store.state.userInfo.aepUserId + store.state.userInfo.nickname
  //   }.txt`,
  //   data: `\n${time} ${hours}:${minutes}:${seconds} ${str}${
  //     obj !== null && obj !== undefined ? JSON.stringify(obj) : ''
  //   }`,
  //   encoding: 'utf-8',
  //   success(res: any) {
  //     // console.log(res)
  //   },
  //   fail(err: any) {
  //     // console.log(err)
  //   }
  // })
}

// 调用quec-basic-log：蓝牙相关日志
function log(info: string) {
  logAli(`[BleManager] ${info}`)
}
export const o = {
  i(info: string) {
    log(info)
  },
  e(info: string) {
    log(info)
  },
  d(info: string) {
    log(info)
  },
  w(info: string) {
    log(info)
  }
}
