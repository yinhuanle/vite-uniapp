## 小程序支持分包：

再 pages.json 中配置 subPackages

```
"subPackages": [{
  "root": "pages-second",
  "pages": [{
    "path": "deviceLocation/deviceLocation",
    "style": { }
  },{
    "path": "HIDSetting/HIDSettingPage",
    "style": { }
  },{
    "path": "HIDSetting/HIDCalibrationPage",
    "style": { }
  }]
}]
```

## 本地开发：

1、通过终端命令，运行即可

npm run dev:h5

2、本地调试其他环境：再 config.js 中修改服务端地址

BASE_URL 和其他环境变量

## 分环境：

package.json 文件配置

```
"h5-fat": {
  "title": "h5测试环境",
  "env": {
    "UNI_PLATFORM": "h5",
    "ENV_TYPE": "h5-fat"
  },
  "define": {
    "H5-FAT": true
  }
},
"pre": {
  "title": "支付宝测试版",
  "env": {
    "UNI_PLATFORM": "mp-alipay"
  },
  "define": {
    "ALIPAY-TEST": true
  }
}
```

如上，通过 define 来区分环境;
再 config.js 中， 标识如：H5-FAT 来区分环境

```
// #ifdef H5-FAT
config = {
  CURRENT_MODE: 'product',
  BASE_URL: 'https://fat-scooter-api.iotomp.com/v2',
  MODE_CN: '测试环境',
  CONFIG_PLATFORM: 'H5-FAT'
}
// #endif

// #ifdef ALIPAY-TEST
config = {
  CURRENT_MODE: 'product',
  BASE_URL: 'https://fat-scooter-api.iotomp.com/v1',
  MODE_CN: '开发环境ALIPAY',
  CONFIG_PLATFORM: 'TEST_ALIPAY'
}
// #endif
```

## 各个环境-构建相关：

1、小程序：开发完成后，可以通过 hbuilder--运行--构建环境
2、H5：开发完成后，可以通过 hbuilder--发行--自定义发行--构建环境
