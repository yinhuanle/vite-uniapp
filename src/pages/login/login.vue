<template>
  <view class="container">
    <view class="content">
      <view class="text-area">
        <text class="title" @click="click">{{ title }}</text>
      </view>
    </view>

    <map
      ref="mapmy"
      style="width: 100%; height: 100vh"
      :latitude="latitude"
      :longitude="longitude"
      :markers="covers"
    >
    </map>

    <tabBar :current-index="2" />
  </view>
</template>

<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import { reactive, ref, getCurrentInstance } from 'vue'
import tabBar from '@/components/tabBar/tabBar.vue'
import { orderList } from '@/api/user'

const instance: any = getCurrentInstance()
const title = ref('组件')
const value1 = 0
uni.setNavigationBarTitle({
  title: '组件'
})
uni.setNavigationBarColor({
  backgroundColor: '#ffffff'
})

const change1 = (e: Object) => {
  console.log('click1', e)
}
const click = (e: Object) => {
  console.log('click1', e)
  orderList({})
}

const click1 = (e: Object) => {}
const click2 = (e: Object) => {
  uni.navigateTo({
    url: '/pages/index/index'
  })
}

const mapShow = ref(false)
const latitude = 23.099994
const longitude = 113.32452

onReady(() => {
  const refs = ref(null)
  const _mapContext = uni.createMapContext('map', refs.value)

  // 仅调用初始化，才会触发 on.("markerClusterCreate", (e) => {})
  _mapContext.initMarkerCluster({
    enableDefaultStyle: false,
    zoomOnClick: true,
    gridSize: 60,
    complete(res) {
      console.log('initMarkerCluster', res)
    }
  })

  // _mapContext.on("markerClusterCreate", (e) => {
  //   console.log("markerClusterCreate", e);
  // });

  addMarkers()

  function addMarkers() {
    const positions = [
      {
        latitude: 23.099994,
        longitude: 113.32452
      },
      {
        latitude: 23.099994,
        longitude: 113.32252
      },
      {
        latitude: 23.099994,
        longitude: 113.32652
      },
      {
        latitude: 23.096994,
        longitude: 113.32952
      }
    ]

    const markers: Object[] = []

    positions.forEach((p, i) => {
      console.log(i)
      markers.push({
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
        },
        ...p
      })
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
