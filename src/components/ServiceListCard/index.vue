<template>
  <div class="service-list-card">
    <el-card v-if="data">
      <h1 class="title" slot="header">{{data.title}}</h1>
      <div class="provider">
        <img :src="data.provider.avatar" alt="avatar" class="avatar">
        <span class="name">{{data.provider.name}}</span>
      </div>
      <div class="price">{{data.price}} 元/次</div>
      <div class="detail clearfix">
        <span class="buy-num">{{data.buyNum}}人购买&nbsp;&nbsp;&nbsp;|</span>
        <span class="like-num">{{data.likeNum}}人喜欢</span>
        <span class="location">
          <i class="icon icon-map"></i>{{data.location}}
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'serviceListCard',
  props: {
    data: {
      type: Object
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
.service-list-card
  box-sizing border-box
  padding 0 10px
  margin 10px 0
  .title
    font-size 20px
    text-align left
  .provider
    margin 10px 0
    font-size 0
    .avatar
      width 70px
      border-radius 50%
    .name
      margin-left 10px
      font-size 14px
      line-height 70px
      vertical-align top
  .price
    font-size 18px
    color #FF6F00
  .detail
    width 100%
    color #8492A6
    line-height 24px
    .buy-num
      float left
      padding-right 10px
      font-size 14px
    .like-num
      float left
      font-size 14px
    .location
      float right
      font-size 14px
      .icon
        font-size 20px
        margin-right 10px
        vertical-align sub
</style>
