<template>
  <div class="home">
    <headBar></headBar>
    <router-view></router-view>
    <div class="tab-bar-wrapper">
      <tabBar></tabBar>
    </div>
  </div>
</template>

<script>
import headBar from 'components/HeadBar'
import tabBar from 'components/TabBar'
import router from '@/router'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    headBar,
    tabBar
  },
  created() {
    router.push('list')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.home
  position relative
  box-sizing border-box
  height 100%
  .tab-bar-wrapper
    position absolute
    left 0
    right 0
    bottom 0
</style>
