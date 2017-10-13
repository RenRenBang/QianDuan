<template>
  <div class="need-detail">
    <headerPage title="需求详情">
      <!-- id: {{$route.params.id}} -->
      <div class="brief-info clearfix">
        <div class="title">title
          <el-tag type="primary" class="tag">SB</el-tag>
        </div>
        <div class="need-people">还需99人&nbsp;&nbsp;|</div>
        <div class="deadline">&nbsp;&nbsp;10天后失效</div>
        <div class="price">100元/人</div>
      </div>
      <div class="describe">
        <div class="lable">需求内容</div>
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa temporibus hic sapiente, quasi eos, maxime maiores, accusantium doloribus dicta id aliquam praesentium? Minus odit cupiditate quasi perferendis eaque asperiores adipisci?</p>
      </div>
      <div class="provider">
        <img src="https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg" alt="" class="avatar">
        <span class="name">名字</span>
      </div>
      <div class="location">
        <i class="icon icon-location-arrow"></i>
        <span class="name">全国</span>
      </div>
      <div class="controler">
        <div class="submit-btn">我要参与</div>
      </div>
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
  min-height 100%
  background #ededed
  .brief-info
    box-sizing: border-box;
    padding 10px 25px
    width 100%
    background #fff
    .title
      margin-bottom 5px
      font-size 24px
      line-height 30px
      .tag
        margin-left 10px
        vertical-align middle
    .need-people
      float left
      font-size 14px
      line-height 30px
      color #475669
    .deadline
      float left
      font-size 14px
      line-height 30px
      color #475669
    .price
      float right
      font-size 14px
      line-height 30px
      color #FF6F00
  .describe
    margin-top 10px
    padding 15px 25px
    background #fff
    .lable
      font-size 18px
      line-height 25px
    .text
      font-size 14px
      font-weight 200
      line-height 20px
      color #475669
  .provider
    margin-top 10px
    padding 10px 25px
    background #fff
    .avatar
      max-width 60px
      vertical-align middle
      border-radius 50%
    .name
      margin-left 10px
      font-size 18px
      font-weight 200
      vertical-align middle
  .location
    margin-top 10px
    padding 10px 25px
    color #475669
    line-height 30px
    background #fff
    .icon
      font-size 24px
      vertical-align middle
    .name
      font-size 18px
      font-weight 200
      vertical-align middle
  .controler
    position fixed
    left 0
    right 0
    bottom 0
    height 40px
    line-height 40px
    text-align center
    .submit-btn
      width 100%
      color #fff
      font-size 20px
      background #20A0FF
</style>
