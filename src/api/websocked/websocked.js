import config from '../config/env.js'
import {
  getToken
} from '../../utils/store.js'
import websockedConst from './websockedConst.js'

// Socket连接成功
var socketOpen = false
// Socket关闭
var socketClose = false
// 消息队列
var socketMsgQueue = []
// 判断心跳变量
var heart = null
// 心跳失败次数
var heartBeatFailCount = 0
// 终止心跳
var heartBeatTimeout = null
// 终止重连
var connectSocketTimeout = null
//心跳时间
const HEART_TIME = 40 * 1000

var webSocket = {
  // 连接Socket
  connectSocket: function (options) {
    wx.showLoading({
      title: '正在请求中',
      mask: true,
    })
    socketOpen = false
    socketClose = false
    socketMsgQueue = []
    wx.connectSocket({
      url: config.websocketUrl,
      success: function (res) {
        if (getToken()) {
          let cmdMsgLogin = JSON.stringify({
            cmd: websockedConst.CMD_LOGIN,
            data: {
              token: getToken()
            }
          })
          webSocket.sendSocketMessage(cmdMsgLogin)
        }
        // if (options) {
        //     options.success && options.success(res);
        // }
      },
      fail: function (res) {
        console.log("error--:" + JSON.stringify(res))
        // if (options) {
        //     options.fail && options.fail(res);
        // }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  // 发送消息
  sendSocketMessage: function (msg) {
    if (socketOpen) {
      wx.sendSocketMessage({
        data: msg,
        success: function (res) {
          //console.log('send sucess')
        },
        fail: function (res) {
          //console.log("error--:"+JSON.stringify(res));
          // if (options) {
          //     options.fail && options.fail(res);
          // }
        }
      })
    } else {
      //socketMsgQueue.push(options.msg)
      socketMsgQueue.push(msg)
    }
  },
  // 关闭Socket
  closeSocket: function (options) {
    if (connectSocketTimeout) {
      clearTimeout(connectSocketTimeout)
      connectSocketTimeout = null
    };
    socketClose = true
    this.stopHeartBeat()
    wx.closeSocket({
      success: function (res) {
        if (options) {
          options.success && options.success(res)
        }
      },
      fail: function (res) {
        if (options) {
          options.fail && options.fail(res)
        }
      }
    })
  },
  // 收到消息
  onSocketMessageCallback: function (res) { },

  // 开始心跳
  startHeartBeat: function () {
    heart = true
    this.heartBeat()
  },

  // 正在心跳
  heartBeat: function () {
    var that = this
    if (!heart) {
      return
    };
    that.sendSocketMessage({
      msg: JSON.stringify({
        // 与后端约定，传点消息，保持链接
        cmd: 'pong'
      }),
      success: function (res) {
        if (heart) {
          heartBeatTimeout = setTimeout(() => {
            that.heartBeat()
          }, HEART_TIME)
        }
      },
      fail: function (res) {
        if (heartBeatFailCount > 2) {
          that.connectSocket()
        };
        if (heart) {
          heartBeatTimeout = setTimeout(() => {
            that.heartBeat()
          }, HEART_TIME)
        };
        heartBeatFailCount++
      },
    })
  },

  // 结束心跳
  stopHeartBeat: function () {
    heart = false
    if (heartBeatTimeout) {
      clearTimeout(heartBeatTimeout)
      heartBeatTimeout = null
    };
    if (connectSocketTimeout) {
      clearTimeout(connectSocketTimeout)
      connectSocketTimeout = null
    }
  },

  /**
   *  发起设备订阅
   * @param deviceKey 设备key
   * @param productKey 产品key
   */
  subscribeDevice (deviceKey, productKey) {
    // 发送订阅指令
    let cmdMsgSubscribe = JSON.stringify({
      cmd: websockedConst.CMD_SUBSCRIBE,
      data: [{
        productKey: productKey,
        deviceKey: deviceKey,
        messageType: [
          websockedConst.MSG_TYPE_ONLINE,
          websockedConst.MSG_TYPE_STATUS,
          websockedConst.MSG_TYPE_RAW_UPLINK,
          websockedConst.MSG_TYPE_M_ATTR_REPORT,
          websockedConst.MSG_TYPE_M_EVENT_INFO,
          websockedConst.MSG_TYPE_M_EVENT_WARN,
          websockedConst.MSG_TYPE_M_EVENT_ERROR,
          websockedConst.MSG_TYPE_LOCATION_INFO_KV,
        ],
      },],
    })
    webSocket.sendSocketMessage(cmdMsgSubscribe)
  },

  /**
   *  取消设备订阅
   * @param deviceKey 设备key
   * @param productKey 产品key
   */
  unsubscribeDevice (deviceKey, productKey) {
    // 发送取消订阅指令
    let cmdMsgUnsubscribe = JSON.stringify({
      cmd: websockedConst.CMD_UNSUBSCRIBE,
      data: [{
        productKey: productKey,
        deviceKey: deviceKey
      },],
    })
    webSocket.sendSocketMessage(cmdMsgUnsubscribe)
  },

  /**
   * 通断状态
    * type: READ-ATTR 物模型属性-读,
    WRITE-ATTR 物模型属性-写,
    EXE-SERV 调用物模型服务,
    RAW 透传命令
   */
  sendCmd (obj) {
    const { pk, dk, type, sendData } = obj
    // 发送指令
    let cmd = JSON.stringify({
      cmd: websockedConst.CMD_SEND,
      data: {
        productKey: pk,
        deviceKey: dk,
        type,
        kv: JSON.stringify(sendData)
      },
    })
    webSocket.sendSocketMessage(cmd)
  }
}

// 监听WebSocket打开连接
wx.onSocketOpen(function (res) {
  wx.hideLoading()
  // 如果已经关闭socket
  if (socketClose) {
    webSocket.closeSocket()
  } else {
    socketOpen = true
    for (var i = 0; i < socketMsgQueue.length; i++) {
      webSocket.sendSocketMessage(socketMsgQueue[i])
    };
    socketMsgQueue = []
    webSocket.startHeartBeat()
  }
})

// 监听WebSocket错误
wx.onSocketError(function (res) {
  console.log('WebSocket连接打开失败，请检查！', res)
})
// 监听WebSocket接受到服务器的消息
wx.onSocketMessage(function (res) {
  webSocket.onSocketMessageCallback(res.data)
})

// 监听WebSocket关闭连接后马上重连
wx.onSocketClose(function (res) {
  if (!socketClose) {
    clearTimeout(connectSocketTimeout)
    connectSocketTimeout = setTimeout(() => {
      webSocket.connectSocket()
    }, 3000)
  }
})

module.exports = webSocket