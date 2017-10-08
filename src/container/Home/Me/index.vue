<template>
  <div class="me">
    <div class="head">
      <el-row>
        <el-col :span="5" :offset="1">
          <div class="avatar">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1762973822,121126736&fm=27&gp=0.jpg" alt="">
          </div>
        </el-col>
        <el-col :span="17" :offset="1">
          <div class="userinfo">
            <span class="name">我叫XXX</span>
            <div class="other">Lorem ipsum dolor sit am</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="order">
      <div class="service-order">
        <i class="icon icon-briefcase"></i>
        <span class="tag">服务订单</span>
      </div>
      <div class="need-order">
        <i class="icon icon-clipboard"></i>
        <span class="tag">需求订单</span>
      </div>
    </div>
    <ul class="optional">
      <li>
        <i class="icon icon-bookmark"></i>
        <span class="name">收藏的服务</span>
      </li>
      <li>
        <router-link to="/editUserInfo">
          <i class="icon icon-cogs"></i>
          <span class="name">修改个人信息</span>
        </router-link>
      </li>
      <router-link to="/login">
        <li>
          <i class="icon icon-user-times"></i>
          <span class="name">注销</span>
        </li>
      </router-link>
      <router-link to="/aboutUs">
        <li>
          <i class="icon icon-group"></i>
          <span class="name">关于我们</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'me',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.me
  height 100%
  background #ededed
  .head
    height 100px
    width 100%
    background #20A0FF
    .avatar
      text-align center
      img
        display inline-block
        margin-top 15px
        height 60px
        width 60px
        border-radius 50%
    .userinfo
      margin-top 26px
      color #fff
      line-height 22px
      .name
        font-size 20px
      .other
        font-size 14px
  .order
    font-size 0
    color #475669
    text-align center
    line-height 80px
    background #fff
    .service-order
      display inline-block
      box-sizing border-box
      border-right 1px solid #ededed
      height 100%
      width 50%
      .icon
        margin-right 10px
        font-size 40px
        color #13CE66
        vertical-align middle
      .tag
        font-size 16px
        vertical-align middle
    .need-order
      display inline-block
      box-sizing border-box
      border-left 1px solid #ededed
      height 100%
      width 50%
      .icon
        margin-right 10px
        font-size 40px
        color #20A0FF
        vertical-align middle
      .tag
        font-size 16px
        vertical-align middle
  .optional
    margin-top 10px
    background #fff
    li
      box-sizing border-box
      padding 0 20px
      border-top 1px solid #ededed
      border-bottom 1px solid #ededed
      height 60px
      line-height 60px
      .icon
        margin-right 10px
        font-size 30px
        vertical-align middle
        &.icon-bookmark
          color #FF6F00
        &.icon-cogs
          color #9E9E9E
        &.icon-user-times
          color #EF5350
        &.icon-group
          color #2196F3
      .name
        color #475669
        font-size 16px
        vertical-align middle
</style>
