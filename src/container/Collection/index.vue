<template>
  <div class="collection">
    <headerPage title="收藏的服务">
      <div class="list-group" v-if="serviceListObj">
        <serviceListCard v-for="(item, index) in serviceListObj" :key="index" :data="item"></serviceListCard>
      </div>
      <div v-else>
        <h1 class="no-content">这里空空如也～</h1>
      </div>
    </headerPage>
  </div>
</template>

<script>
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
import serviceListCard from 'components/ServiceListCard'
export default {
  name: 'collection',
  data() {
    return {
      serviceList: undefined
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    }
  },
  components: {
    headerPage,
    serviceListCard
  },
  computed: {
    uid() {
      return store.state.uID
    },
    serviceListObj() {
      if (!this.serviceList) {
        return undefined
      }
      return this.serviceList.map(item => {
        return {
          oid: item.corder.oid,
          title: item.corder.title,
          trade: item.corder.trade,
          money: item.corder.money,
          gmNum: item.corder.gmNum,
          collNum: item.corder.collNum,
          address: item.corder.address
        }
      })
    }
  },
  created() {
    console.log(this.uid)
    this.$http
      .post(`http://47.95.214.71:8080/api/findCollectionByUid`, qs.stringify({ uid: this.uid }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        this.serviceList = response.data.data
        console.log(this.serviceList)
      })
      .catch(err => {
        this.$message({
          message: err,
          type: 'error',
          duration: 2000
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.collection {
  min-height: 100%;
  background: #ededed;

  .no-content {
    text-align: center;
    margin-top: 140px;
    font-size: 19px;
    font-weight: 200;
    color: #99A9BF;
  }
}
</style>
