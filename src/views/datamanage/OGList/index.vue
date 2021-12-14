<template>
  <div class="index-container">
    <el-row :gutter="20">

      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="12"
        :sm="6"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <router-link :to="item.link" target="_blank">
          <el-card class="icon-panel" shadow="never">
            <vab-icon
              :style="{ color: item.color }"
              :icon="['fas', item.icon]"
            />
            <p>{{ item.title }}</p>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Index',
  data() {
    return {
      // 卡片图标
      iconList: [
        {
          icon: 'video',
          title: '视频播放器',
          link: '/vab/player',
          color: '#ffc069'
        },
        {
          icon: 'table',
          title: '表格',
          link: '/vab/table/comprehensiveTable',
          color: '#5cdbd3'
        },
        {
          icon: 'laptop-code',
          title: '源码',
          link: 'https://github.com/chuzhixin/vue-admin-beautiful',
          color: '#b37feb'
        },
        {
          icon: 'book',
          title: '书籍',
          link: '',
          color: '#69c0ff'
        },
        {
          icon: 'bullhorn',
          title: '公告',
          link: '',
          color: '#ff85c0'
        },
        {
          icon: 'gift',
          title: '礼物',
          link: '',
          color: '#ffd666'
        }
      ]
    }
  }
}
</script>

<style lang='less'>

</style>
