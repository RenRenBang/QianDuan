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
</style>
