<template>
  <div class="tab-bar-wrapper">
    <div class="tab-bar">
      <el-row>
        <el-col :span="8">
          <div class="icon-btn" @click="changeActiveBtn('list')">
            <i class="icon icon-align-justify" :class="{'active' : activeBtn === 'list'}"></i>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="icon-btn add-btn">
            <i class="icon icon-plus add"></i>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="icon-btn" @click="changeActiveBtn('user')">
            <i class="icon icon-user-o" :class="{'active' : activeBtn === 'user'}"></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-bar',
  data() {
    return {
      activeBtn: 'list'
    }
  },
  methods: {
    changeActiveBtn(v) {
      this.activeBtn = v
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.tab-bar-wrapper
  height 60px
  overflow hidden
  .tab-bar
    position relative
    top 12px
    box-sizing border-box
    height 48px
    font-size 0
    text-align center
    background #F9FAFC
    box-shadow rgba(0, 0, 0, 0.12) 0px 2px 4px 0px, rgba(0, 0, 0, 0.04) 0px 0px 6px 0px
    .icon-btn
      width 100%
      .icon
        color #475669
        font-size 20px
        line-height 48px
        transition .4s
        &.active
          color #20A0FF
          font-size 24px
        &.add
          position relative
          top -4px
          color #fff
    .add-btn
      position relative
      top -10px
      display inline-block
      border: 6px #F9FAFC solid
      height 40px
      width 40px
      background #20A0FF
      border-radius 50%
</style>
