<template>
  <div class="buy-order">
    <headerPage title="已购买订单">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="服务" name="service" class="service-tab">
          <ul class="service-list">
            <li v-for="i in 10" :key="i">
              <serviceListCard :data="data"></serviceListCard>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="需求" name="need" class="need-tab">
          <ul class="need-list">
            <li v-for="i in 10" :key="i">
              <needListCard :data="data2"></needListCard>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
import serviceListCard from 'components/ServiceListCard'
import needListCard from 'components/NeedListCard'
export default {
  name: 'buyOrder',
  data() {
    return {
      activeName: 'service',
      data: {
        id: 1,
        title: 'test title',
        tag: '教育',
        buyNum: 4,
        likeNum: 103,
        location: '全国',
        price: 998,
        provider: {
          name: 'Tom',
          avatar: 'https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg'
        }
      },
      data2: {
        id: 2,
        title: 'test title',
        tag: '互联网',
        needNum: 4,
        location: '全国',
        deadline: 3,
        price: 92,
        provider: {
          name: 'Jack',
          avatar: 'https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg'
        }
      }
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    headerPage,
    serviceListCard,
    needListCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.buy-order {
  top: 0;
  bottom: 0;
  background: #ededed;

  .tabs {
    .el-tabs__header {
      margin: 0;

      .el-tabs__nav {
        width: 100%;
        background: #fff;

        .el-tabs__item {
          width: 50%;
          text-align: center;
        }
      }
    }

    .el-tabs__content {
      .service-tab {
        padding: 0;
      }

      .need-tab {
        height: 100%;
      }
    }
  }
}
</style>