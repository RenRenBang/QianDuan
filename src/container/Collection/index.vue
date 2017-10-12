<template>
  <div class="collection">
    <headerPage title="收藏的服务">
      <div class="list-group">
        <serviceListCard v-for="i in 10" :key="i" :data="data"></serviceListCard>
      </div>
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
import serviceListCard from 'components/ServiceListCard'
export default {
  name: 'collection',
  data() {
    return {
      data: {
        id: 1,
        title: 'test title',
        buyNum: 4,
        likeNum: 103,
        location: '全国',
        price: 998,
        provider: {
          name: 'Tom',
          avatar: 'https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg'
        }
      }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.collection
  background #ededed
</style>
