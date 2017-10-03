<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import "./assets/stylus/index.styl"
html, body
  height 100%
  #app
    height 100%
</style>
