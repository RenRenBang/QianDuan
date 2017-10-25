<template>
  <div class="tab-bar-wrapper">
    <div class="tab-bar shadow">
      <el-row>
        <el-col :span="8">
          <div class="icon-btn" @click="changeActiveBtn('list')">
            <i class="icon icon-align-justify" :class="{'active' : activeBtn === 'list'}"></i>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="icon-btn add-btn" @click.prevent="toggleAddLayer()">
            <i class="icon icon-plus add"></i>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="icon-btn" @click="changeActiveBtn('me')">
            <i class="icon icon-user" :class="{'active' : activeBtn === 'me'}"></i>
          </div>
        </el-col>
      </el-row>
    </div>
    <transition name="fade">
      <div v-show="addLayerActive" class="add-layer">
        <div class="add-layer-content">
          <el-row>
            <el-col :span="6" :offset="3">
              <router-link to="/serviceForm">
                <div class="btn service-btn" @click="toggleAddLayer()">
                  <i class="icon icon-briefcase"></i>
                </div>
              </router-link>
              <div class="tag">发布服务</div>
            </el-col>
            <el-col :span="6" :offset="6">
              <router-link to="/needForm">
              <div class="btn need-btn" @click="toggleAddLayer()">
                <i class="icon icon-flag"></i>
              </div>
              </router-link>
              <div class="tag">发布需求</div>
            </el-col>
          </el-row>
        </div>
        <div class="add-layer-close">
          <i class="icon el-icon-close" @click="toggleAddLayer()"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'tab-bar',
  data() {
    return {
      activeBtn: 'list',
      addLayerActive: false
    }
  },
  methods: {
    changeActiveBtn(v) {
      this.activeBtn = v
      v === 'list' ? router.replace('/home/' + v) : router.replace('/home/me')
    },
    toggleAddLayer() {
      this.addLayerActive = !this.addLayerActive
    }
  },
  created() {
    this.activeBtn = document.URL.match(/\/\w+?$/g)[0].slice(1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.tab-bar-wrapper
  height 60px
  .tab-bar
    position relative
    top 12px
    box-sizing border-box
    height 48px
    width 100%
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
  .add-layer
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    background-color rgba(7, 17, 27, 0.8)
    overflow auto
    .add-layer-content
      position relative
      top 45%
      text-align center
      .btn
        display inline-block
        width 100px
        height 100px
        background #eee
        border-radius 50%
        .icon
          position relative
          color #fff
          font-size 48px
        &.service-btn
          background #13CE66
          .icon
            top 31px
        &.need-btn
          background #20A0FF
          .icon
            top 25px
      .tag
        margin 12px 0 0 0
        color #fff
        font-size 18px
    .add-layer-close
      position absolute
      bottom 20px
      width 100%
      text-align center
      .icon
        color white
        font-size 22px
</style>
