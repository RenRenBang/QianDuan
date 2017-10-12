<template>
  <div id="app">
    <transition name="el-fade-in">
      <router-view style="position:absolute;left:0;right:0"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import "./assets/stylus/index.styl"
::-webkit-scrollbar
  display: none
html, body
  height 100%
  position absolute
  #app
    height 100%
</style>
