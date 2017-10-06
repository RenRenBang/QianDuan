<template>
  <div class="home">
    <transition name="fade">
      <router-view style="position:absolute;width:100%"></router-view>
    </transition>
    <div class="tab-bar-wrapper">
      <tabBar></tabBar>
    </div>
  </div>
</template>

<script>
import tabBar from './TabBar'
// import router from '@/router'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    tabBar
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
