<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
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

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      // 卡片图标
      iconList: [
        {
          icon: 'video',
          title: '活跃用户量',
          link: '/vab/player',
          color: '#ffc069'
        },
        {
          icon: 'table',
          title: '交易订单量',
          link: '/vab/table/comprehensiveTable',
          color: '#5cdbd3'
        },
        {
          icon: 'laptop-code',
          title: '广告投放数',
          link: 'https://github.com/chuzhixin/vue-admin-beautiful',
          color: '#b37feb'
        },
        {
          icon: 'book',
          title: '公告',
          link: '',
          color: '#69c0ff'
        },
        {
          icon: 'bullhorn',
          title: '投诉',
          link: '',
          color: '#ff85c0'
        },
        {
          icon: 'gift',
          title: '审核',
          link: '',
          color: '#ffd666'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
