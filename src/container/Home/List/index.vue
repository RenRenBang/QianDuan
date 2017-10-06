<template>
  <div class="list">
    <headBar></headBar>
    <div ref="wrapper" class="wrapper">
      <ul class="sort-box">
        <li class="sort-item" :class="{'active' : activeSort === 'all'}" @click="sortActive('all')">
          <i class="icon icon-list-ul"></i><br>
          <span class="tag">全部</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'home'}" @click="sortActive('home')">
          <i class="icon icon-home"></i><br>
          <span class="tag">家政</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'edu'}" @click="sortActive('edu')">
          <i class="icon icon-graduation-cap"></i><br>
          <span class="tag">教育</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'net'}" @click="sortActive('net')">
          <i class="icon icon-sphere"></i><br>
          <span class="tag">互联网</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'life'}" @click="sortActive('life')">
          <i class="icon icon-mug"></i><br>
          <span class="tag">生活</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'design'}" @click="sortActive('design')">
          <i class="icon icon-magic"></i><br>
          <span class="tag">设计</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'other'}" @click="sortActive('other')">
          <i class="icon icon-tongue"></i><br>
          <span class="tag">其他</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import headBar from './HeadBar'
export default {
  name: 'list',
  data() {
    return {
      activeSort: 'all'
    }
  },
  methods: {
    sortActive(v) {
      this.activeSort = v
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs['wrapper'], {scrollX: true, click: true})
        console.log(this.scroll)
      } else {
        this.scroll.refresh()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  components: {
    headBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.list
  width 100%
  height 100%
  background #ededed
  .wrapper
    width 100%
    overflow hidden
    background #F9FAFC
    .sort-box
      width 490px
      font-size 0
      white-space nowrap
      .sort-item
        display inline-block
        box-sizing border-box
        margin-top 4px
        padding-top 10px
        border-right 2px solid #ededed
        height 70px
        width 70px
        font-size 0
        text-align center
        color #475669
        font-weight 200
        white-space normal
        transition .3s
        .icon
          display inline-block
          font-size 30px
          vertical-align middle
        .tag
          display inline-block
          margin-top 5px
          font-size 14px
        &.active
          color #F9FAFC
          background #20A0FF
</style>
