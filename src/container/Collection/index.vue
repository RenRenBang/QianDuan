<template>
  <div class="collection">
    <headerPage title="收藏的服务">
      123
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'collection',
  data() {
    return {
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    }
  },
  components: {
    headerPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.collection
  padding 70px 12px 0 12px
</style>
