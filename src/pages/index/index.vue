<template>
  <view class="container">
    <view class="text-area">
      <br />
      <br />
      <view class="handle-list">
        <u-cell-group>
          <u-cell
            icon="/static/images/icon/log.svg"
            title="日志上报"
            is-link
            :border="false"
            size="large"
            @click="getSavedFileList"
          ></u-cell>
        </u-cell-group>
      </view>
    </view>

    <!-- <view class="page-section page-section-gap width-all">
		<map v-if="mapShow" :scale="12" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers" @markertap="openMap(latitude,longitude,'initFoemdata.title')">
		</map>
	</view> -->

    <tabBar :current-index="2" />
  </view>
</template>

<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import tabBar from '@/components/tabBar/tabBar.vue'
// import { ref } from 'vue'
import { getProtocol } from '@/api/login'
import constant from '@/utils/constant'

uni.setNavigationBarTitle({
  title: '标题名称'
})
uni.setNavigationBarColor({
  backgroundColor: '#ffffff'
})

const getSavedFileList = async () => {
  window.location.href =
    'https://4551742451.imdo.co/payh5/pay.html?orderStr=&tradeNO=202407032200141397145728070811'
  // console.log(result, 'result')
}

// 获取协议
const getAgreement = async () => {
  try {
    const res = await getProtocol({ flag: constant.APP_FLAG })
    if (+res.code === 200) {
      // protocols.value = res.data.filter(ele => ele.agreementType === 1 || ele.agreementType === 2)
    }
  } catch (fail) {
    console.log(fail)
  }
}
getAgreement()

onLaunch(() => {})
onShow(option => {
  console.log('option', option)
})
onHide(() => {})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content {
    flex: 1;
  }
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }
}
</style>
