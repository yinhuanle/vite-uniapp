<template>
  <cover-view class="tab-bar">
    <u-tabbar
      :safe-area-inset-bottom="true"
      :border="false"
      :fixed="currentIndex == 2"
      :value="currentIndex"
      z-index="99999"
      :placeholder="true"
      @change="changeHandle"
    >
      <u-tabbar-item v-for="(item, index) of tabList" :key="index" :name="index">
        <template #active-icon>
          <up-image :src="item.selectedIconPath" width="42px" height="42px"></up-image>
        </template>
        <template #inactive-icon>
          <up-image :src="item.iconPath" width="24px" height="24px"></up-image>
        </template>
      </u-tabbar-item>
    </u-tabbar>
  </cover-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const tabList = [
      {
        pagePath: '/pages/index/index',
        iconPath: '/static/images/home.png',
        selectedIconPath: '/static/images/home-selected.png'
      },
      {
        pagePath: '/pages/login/login',
        iconPath: '/static/images/mine.png',
        selectedIconPath: '/static/images/mine-selected.png'
      }
    ]
    function changeHandle(name: number) {
      uni.switchTab({
        url: tabList[name].pagePath
      })
    }
    return {
      tabList,
      changeHandle
    }
  }
})
</script>

<style></style>
