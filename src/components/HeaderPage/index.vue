<template>
  <div class="header-page">
    <div class="top-bar">
      <i class="back-btn el-icon-arrow-left" @click="goBack"></i>
      <span class="title">{{this.title}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'headerPage',
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.header-page
  box-sizing border-box
  padding-top 50px
  min-height 100%
  .top-bar
    position fixed
    top 0
    left 0
    right 0
    z-index 2000
    text-align center
    background #F9FAFC
    .back-btn
      display inline-block
      padding 15px
      float left
      font-size 20px
    .title
      display inline-block
      margin-left -30px
      font-size 20px
      line-height 50px
      vertical-align top
</style>
