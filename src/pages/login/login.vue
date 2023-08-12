<template>
  <view class="container">
    <view class="content">
      <view class="text-area">
        <text class="title" @click="click">{{ title }}</text>
      </view>
    </view>

    <map ref="mapmy" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>

  </view>
</template>


<script setup lang="ts">
import { onReady } from "@dcloudio/uni-app";
import {orderList} from '@/api/user';
import { reactive, ref, getCurrentInstance } from 'vue'

const instance: any = getCurrentInstance()
const title = ref('组件')
const value1 = 0
uni.setNavigationBarTitle({
    title: "组件"
});
uni.setNavigationBarColor({
    backgroundColor: '#ffffff',
})

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
    url: '/pages/index/index'
  });
}


let mapShow = ref(false)
const latitude = 23.099994
const longitude= 113.324520


onReady(() => {
  const refs = ref(null)
  let _mapContext = uni.createMapContext("map", refs.value);

  // 仅调用初始化，才会触发 on.("markerClusterCreate", (e) => {})
  _mapContext.initMarkerCluster({
    enableDefaultStyle: false,
    zoomOnClick: true,
    gridSize: 60,
    complete(res) {
      console.log('initMarkerCluster', res)
    }
  });

  // _mapContext.on("markerClusterCreate", (e) => {
  //   console.log("markerClusterCreate", e);
  // });

  addMarkers();

  function addMarkers() {
        const positions = [
          {
            latitude: 23.099994,
            longitude: 113.324520,
          }, {
            latitude: 23.099994,
            longitude: 113.322520,
          }, {
            latitude: 23.099994,
            longitude: 113.326520,
          }, {
            latitude: 23.096994,
            longitude: 113.329520,
          }
        ]

        let markers: Object[] = []

        positions.forEach((p, i) => {
          console.log(i)
          markers.push(
            Object.assign({},{
              id: i + 1,
              width: 40,
    height: 40,
    iconPath: 'https://quec-saas-aep.oss-cn-shanghai.aliyuncs.com/2023-02-07/1675754303081.png',
              joinCluster: true, // 指定了该参数才会参与聚合
              label: {
                  width: 50,
                  height: 30,
                  borderWidth: 1,
                  borderRadius: 10,
                  bgColor: '#ffffff',
                  content: `label ${i + 1}`
              }
            },p)
          )
        })
        _mapContext.addMarkers({
            markers,
            clear: false,
            complete(res) {
              console.log('addMarkers', res)
            }
        })
      }
})
      

      
    
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - (44px + env(safe-area-inset-top)));
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
