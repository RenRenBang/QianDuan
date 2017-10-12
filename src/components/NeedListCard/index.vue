<template>
  <div class="need-list-card">
    <router-link :to="`/NeedDetail/${data.id}`">
      <el-card v-if="data" :body-style="{'padding': '10px 20px'}">
        <h1 class="title" slot="header">{{data.title}}</h1>
        <div class="provider">
          <img :src="data.provider.avatar" alt="avatar" class="avatar">
          <span class="name">{{data.provider.name}}</span>
        </div>
        <div class="price">{{data.price}} 元/人</div>
        <div class="detail clearfix">
          <span class="deadline">{{data.deadline}}天后失效&nbsp;&nbsp;&nbsp;|</span>
          <span class="need-num">需{{data.needNum}}人</span>
          <span class="location">
            <i class="icon icon-location-arrow"></i>{{data.location}}
          </span>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'needListCard',
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
.need-list-card
  box-sizing border-box
  padding 0 10px
  margin 10px 0
  .title
    font-size 24px
    text-align left
  .provider
    font-size 0
    .avatar
      width 50px
      height 50px
      border-radius 50%
    .name
      margin-left 10px
      font-size 18px
      font-weight 200
      line-height 50px
      vertical-align top
  .price
    margin 10px 0
    font-size 20px
    color #FF6F00
  .detail
    width 100%
    color #8492A6
    line-height 24px
    .deadline
      float left
      font-size 14px
    .need-num
      float left
      padding-left 10px
      font-size 14px
    .location
      float right
      font-size 14px
      .icon
        font-size 20px
        margin-right 10px
        vertical-align sub
</style>
