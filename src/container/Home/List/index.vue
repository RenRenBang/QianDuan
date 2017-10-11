<template>
  <div class="list">
    <div class="head-bar shadow">
      <el-input placeholder="请输入内容" v-model="searchWd" icon="search" :on-icon-click="handleSearch">
        <el-select v-model="selectMode" slot="prepend" placeholder="请选择" class="select">
          <el-option label="服务" value="1"></el-option>
          <el-option label="需求" value="2"></el-option>
        </el-select>
      </el-input>
    </div>
    <div ref="sort-wrapper" class="sort-wrapper">
      <ul class="sort-box">
        <li class="sort-item" :class="{'active shadow' : activeSort === 'all'}" @click="sortActive('all')">
          <i class="icon icon-list-ul"></i><br>
          <span class="tag">全部</span>
        </li>
        <li class="sort-item" :class="{'active shadow' : activeSort === 'home'}" @click="sortActive('home')">
          <i class="icon icon-home"></i><br>
          <span class="tag">家政</span>
        </li>
        <li class="sort-item" :class="{'active shadow' : activeSort === 'edu'}" @click="sortActive('edu')">
          <i class="icon icon-graduation-cap"></i><br>
          <span class="tag">教育</span>
        </li>
        <li class="sort-item" :class="{'active shadow' : activeSort === 'net'}" @click="sortActive('net')">
          <i class="icon icon-sphere"></i><br>
          <span class="tag">互联网</span>
        </li>
        <li class="sort-item" :class="{'active shadow' : activeSort === 'life'}" @click="sortActive('life')">
          <i class="icon icon-mug"></i><br>
          <span class="tag">生活</span>
        </li>
        <li class="sort-item" :class="{'active shadow' : activeSort === 'design'}" @click="sortActive('design')">
          <i class="icon icon-magic"></i><br>
          <span class="tag">设计</span>
        </li>
        <li class="sort-item" :class="{'active' : activeSort === 'other'}" @click="sortActive('other')">
          <i class="icon icon-tongue"></i><br>
          <span class="tag">其他</span>
        </li>
      </ul>
    </div>
    <transition-group name="fade" mode="in-out">
      <div v-show="selectMode === '1'" key="service" class="list-group">
        <serviceListCard v-for="i in 10" :key="i" :data="data"></serviceListCard>
      </div>
      <div v-show="selectMode === '2'" key="need" class="list-group">
        <needListCard v-for="i in 10" :key="i" :data="data2"></needListCard>
      </div>
    </transition-group>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import serviceListCard from 'components/ServiceListCard'
import needListCard from 'components/NeedListCard'
export default {
  name: 'list',
  data() {
    return {
      searchWd: '',
      selectMode: '1',
      activeSort: 'all',
      data: {
        id: 1,
        title: 'test title',
        buyNum: 4,
        likeNum: 103,
        location: '全国',
        price: 998,
        provider: {
          name: 'Tom',
          avatar: 'https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg'
        }
      },
      data2: {
        id: 2,
        title: 'test title',
        needNum: 4,
        location: '全国',
        deadline: 3,
        price: 92,
        provider: {
          name: 'Jack',
          avatar: 'https://i.loli.net/2017/10/09/59dad0a5aa41c.jpg'
        }
      }
    }
  },
  methods: {
    clearFocus() {
      document.activeElement.blur()
    },
    sortActive(v) {
      this.activeSort = v
      this.clearFocus()
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs['sort-wrapper'], { scrollX: true, click: true })
        console.log(this.scroll)
      } else {
        this.scroll.refresh()
      }
    },
    handleSearch() {
      console.log(this.searchWd)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  components: {
    serviceListCard,
    needListCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.list
  width 100%
  min-height 100%
  .head-bar
    box-sizing border-box
    padding 10px
    width 100%
    background #f9fafc
    .select
      width 80px
  .sort-wrapper
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
  .list-group
    position absolute
    padding-bottom 115px
    width 100%
    background #ededed
</style>
