<template>
  <div class="service-detail">
    <headerPage title="服务详情">
      id: {{$route.params.id}}
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'serviceDetail',
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
.service-detail
  padding 70px 12px 0 12px
</style>
