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
import TabBar from './TabBar'

export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    TabBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.home {
  position: relative;
  height: 100%;

  .tab-bar-wrapper {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
