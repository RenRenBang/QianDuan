<template>
  <div class="need-detail">
    <headerPage title="需求详情">
      id: {{$route.params.id}}
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'needDetail',
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
.need-detail
  padding 70px 12px 0 12px
</style>
