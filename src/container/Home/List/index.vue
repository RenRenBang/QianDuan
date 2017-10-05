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
  .wrapper
    width 100%
    overflow hidden
    background #f9fafc
    .sort-box
      width 510px
      white-space nowrap
      .sort-item
        display inline-block
        box-sizing border-box
        margin-top 6px
        border-left 2px solid #ededed
        height 60px
        width 70px
        font-size 0
        text-align center
        white-space normal
        .icon
          display inline-block
          font-size 30px
          vertical-align middle
        .tag
          display inline-block
          margin-top 5px
          font-size 14px
        &.active
          color #fff
          background #20A0FF
</style>
