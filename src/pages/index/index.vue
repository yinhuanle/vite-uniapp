<template>
  <view class="container">
	
      <view class="text-area">
        <text class="title" @click="click">{{ title }}</text>
      </view>
	  
	  <!-- <view class="page-section page-section-gap width-all">
		<map v-if="mapShow" :scale="12" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers" @markertap="openMap(latitude,longitude,'initFoemdata.title')">
		</map>
	</view> -->



  </view>
</template>


<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {orderList} from '@/api/user';
import { reactive, ref } from 'vue'

let mapShow = ref(false)
const latitude = 39.909
const longitude= 116.39742
let covers: Object[] = []

uni.setNavigationBarTitle({
    title: "标题名称"
});
uni.setNavigationBarColor({
    backgroundColor: '#ffffff',
})


// 接口异步获取数据
// setTimeout(() => {
  mapShow.value = true
  covers = [{
    latitude: 39.909,
    longitude: 116.39742,
    width: 40,
    height: 40,
    iconPath: 'https://quec-saas-aep.oss-cn-shanghai.aliyuncs.com/2023-02-07/1675754303081.png'
  }, {
    latitude: 39.86,
    longitude: 116.377,
    width: 40,
    height: 40,
    iconPath: 'https://quec-saas-aep.oss-cn-shanghai.aliyuncs.com/2023-02-07/1675754303081.png'
  }]
// }, 1 * 1000);

			
const title = ref('index')
const value1 = 0

let  change1 = (e:Object) => {
	console.log('click1', e);
}
let  click = (e: Object) => {
	console.log('click1', e);
	// uni.makePhoneCall({
	// 	phoneNumber: '114' //仅为示例
	// });
  orderList({})
}

let  click1 = (e: Object) => {
	
}
let  click2 = (e: Object) => {
	uni.navigateTo({
    url: 'index2?id=1&name=uniapp'
  });
}

// 打开的点击事件，传经纬度和地点名
let openMap = (latitude,longitude,name) => {
	// 打开第三方 （小程序）
	uni.getLocation({
		type: 'gcj02', //返回可以用于uni.openLocation的经纬度(支付宝小程序 getLocation 暂不支持 type)
		success(res) {
			console.log('latitude', latitude)
			uni.openLocation({
				latitude: 36,
				longitude: 119,
				name: '合肥', // 支付宝必填
				address: '合肥中国声谷', // 支付宝必填
				scale: 15
			});
		}
	});
}

onLaunch(() => {
  
});
onShow((option) => {
  console.log('option', option);
  
});
onHide(() => {
  
});
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

.text-area {
	position: fixed;
	z-index: 9;
	left: 0;
	top: 0;
	right: 0;
}
</style>
