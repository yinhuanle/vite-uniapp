<template>
  <view class="container">

      <view class="text-area">
        <text class="title" @click="click">{{ title }}</text>
      </view>



  </view>
</template>


<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {orderList} from '@/api/user';

import { reactive, ref } from 'vue'
const title = ref('接口')
const value1 = 0

let  change1 = (e:Object) => {
	console.log('click1', e);
}
let  click = (e: Object) => {
	console.log('click1', e);
  orderList({})
}

let  click1 = (e: Object) => {
	
}
let  click2 = (e: Object) => {
	uni.navigateTo({
    url: 'index2?id=1&name=uniapp'
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


</style>
