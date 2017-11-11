<template>
  <div class="buy-order">
    <headerPage title="已购买订单">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="服务" name="service" class="service-tab">
          <ul class="service-list" v-if="serviceList">
            <li v-for="(item, index) in serviceList" :key="index">
              <serviceListCard :data="item.corder"></serviceListCard>
            </li>
          </ul>
          <div v-else>
            <h1 class="no-content">这里空空如也～</h1>
          </div>
        </el-tab-pane>
        <el-tab-pane label="需求" name="need" class="need-tab">
          <ul class="need-list" v-if="needList">
            <li v-for="(item, index) in needList" :key="index">
              <needListCard :data="item.corder"></needListCard>
            </li>
          </ul>
          <div v-else>
            <h1 class="no-content">这里空空如也～</h1>
          </div>
        </el-tab-pane>
      </el-tabs>
    </headerPage>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
import serviceListCard from 'components/ServiceListCard'
import needListCard from 'components/NeedListCard'
export default {
  name: 'buyOrder',
  data() {
    return {
      activeName: 'service',
      serviceList: [],
      needList: []
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      this.activeName === 'service' ? this.getServiceList() : this.getNeedList()
    },
    getServiceList() {
      this.$http
        .get(`http://47.95.214.71:8080/api/queryTransactionById?uid=${this.uid}&type=s`)
        .then(response => {
          this.serviceList = response.data.data
          console.log('get service')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getNeedList() {
      this.$http
        .get(`http://47.95.214.71:8080/api/queryTransactionById?uid=${this.uid}&type=n`)
        .then(response => {
          this.needList = response.data.data
          console.log('get need')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    headerPage,
    serviceListCard,
    needListCard
  },
  computed: {
    uid() {
      return store.state.uID
    }
  },
  created() {
    this.getServiceList()
    this.getNeedList()
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
        padding: 1px 0;
        background: #ededed;
      }

      .need-tab {
        padding: 1px 0;
        background: #ededed;
      }
    }

    .no-content {
      text-align: center;
      margin-top: 140px;
      font-size: 19px;
      font-weight: 200;
      color: #99A9BF;
    }
  }
}
</style>