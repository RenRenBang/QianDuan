<template>
  <div class="service-detail">
    <headerPage title="服务详情">
      <!-- id: {{$route.params.id}} -->
      <div class="brief-info">
        <div class="title">title</div>
        <div class="price">100</div>
      </div>
      <div class="describe">
        <div class="lable">服务内容</div>
        <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa temporibus hic sapiente, quasi eos, maxime maiores, accusantium doloribus dicta id aliquam praesentium? Minus odit cupiditate quasi perferendis eaque asperiores adipisci?</p>
      </div>
      <div class="provider">
        <img src="https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg" alt="" class="avatar">
        <span class="name">名字</span>
      </div>
      <div class="controler">
        <el-row>
          <el-col :span="4">
            <div class="collect-btn"><i class="icon el-icon-star-off"></i></div>
          </el-col>
          <el-col :span="20">
            <div class="submit-btn">立即预约</div>
          </el-col>
        </el-row>
      </div>
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'serviceDetail',
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
.service-detail
  min-height 100%
  background #ededed
  .brief-info
    padding 10px
    background #fff
    .title
      font-size 20px
      line-height 30px
    .price
      font-size 18px
      line-height 30px
      color #FF6F00
  .describe
    margin-top 10px
    padding 15px 10px
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
    padding 10px
    background #fff
    .avatar
      max-width 60px
      border-radius 50%
    .name
      font-size 20px
      font-weight 200
  .controler
    position fixed
    left 0
    right 0
    bottom 0
    height 40px
    line-height 40px
    text-align center
    .collect-btn
      color #C6D1DE
      font-size 20px
      background #F9FAFC
      .active
        color #F7BA2A
    .submit-btn
      color #fff
      font-size 20px
      background #20A0FF
</style>
