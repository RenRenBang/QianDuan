<template>
  <div class="home">
    <headBar></headBar>
    <h1>HOME</h1>
    <div class="tab-bar-wrapper">
      <tabBar></tabBar>
    </div>
  </div>
</template>

<script>
import headBar from 'components/HeadBar'
import tabBar from 'components/TabBar'
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
