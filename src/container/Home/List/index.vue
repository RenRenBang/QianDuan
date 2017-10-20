<template>
  <div class="list">
    <div class="head-bar shadow">
      <el-input placeholder="请输入内容" v-model="searchWd" icon="search" :on-icon-click="handleSearch">
        <el-select v-model="selectMode" slot="prepend" placeholder="请选择" class="select" @change="handleSelect">
          <el-option label="需求" value="2"></el-option>
          <el-option label="服务" value="1"></el-option>
        </el-select>
      </el-input>
    </div>
    <transition name="fade" mode="in-out">
      <div ref="sort-wrapper" class="sort-wrapper" v-show="sortBoxVisiable">
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
    </transition>
    <transition-group name="fade" mode="in-out">
      <div v-if="selectMode === '1'" key="service" class="list-group">
        <scroll ref="scroll" v-if="serviceList" class="list-scroller" :class="{'long-mode': !sortBoxVisiable}" :data="serviceList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :listenScroll="true" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp" @scroll="listenScroll">
          <ul class="service-list list">
            <li v-for="(item, index) in serviceList" :key="index">
              <serviceListCard :data="item"></serviceListCard>
            </li>
          </ul>
        </scroll>
      </div>
      <div v-if="selectMode === '2'" key="need" class="list-group">
        <scroll ref="scroll" v-if="needList" class="list-scroller" :class="{'long-mode': !sortBoxVisiable}" :data="needList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :listenScroll="true" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp" @scroll="listenScroll">
          <ul class="need-list list">
            <li v-for="(item, index) in needList" :key="index">
              <needListCard :data="item"></needListCard>
            </li>
          </ul>
        </scroll>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store'
import BScroll from 'better-scroll'
import Scroll from 'components/scroll/scroll'
import serviceListCard from 'components/ServiceListCard'
import needListCard from 'components/NeedListCard'
import { ease } from 'assets/js/ease.js'
export default {
  name: 'list',
  data() {
    return {
      offset: 10,
      needList: null,
      serviceList: null,
      searchWd: '',
      selectMode: '2',
      activeSort: 'all',
      sortBoxVisiable: true,
      scrollbar: true,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '上拉加载更多',
      pullUpLoadNoMoreTxt: '没有新数据了',
      startY: 0,
      scrollToX: 0,
      scrollToY: -200,
      scrollToTime: 700,
      scrollToEasing: 'bounce',
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      itemIndex: 0
    }
  },
  methods: {
    clearFocus() {
      document.activeElement.blur()
    },
    sortActive(v) {
      this.activeSort = v
      this.selectMode === '1' ? this.getServiceList() : this.getNeedList()
      this.clearFocus()
    },
    handleSelect() {
      this.selectMode === '1' ? this.getServiceList() : this.getNeedList()
      store.commit('changeListMode', this.selectMode)
    },
    _initSortScroll() {
      if (!this.sortScroll) {
        this.sortScroll = new BScroll(this.$refs['sort-wrapper'], { scrollX: true, click: true })
      } else {
        this.sortScroll.refresh()
      }
    },
    handleSearch() {
      console.log(this.searchWd)
      this.selectMode === '1' ? this.getServiceList() : this.getNeedList()
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
    },
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      this.selectMode === '1' ? this.getServiceList() : this.getNeedList()
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      if (this.selectMode === '1') {
        this.$http.get(`http://47.95.214.71:8080/api/queryCorderBy?type=s&trade=${this.queryType}&title=${this.searchWd}&offset=${this.offset}`).then((response) => {
          if (response.data.statusCode === '200') {
            let list = []
            for (let i of response.data.data) {
              list.push(i)
            }
            this.serviceList = this.serviceList.concat(list)
            console.log(this.serviceList)
            this.offset += 10
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }).catch(() => {
          console.log('service err')
        })
      } else {
        this.$http.get(`http://47.95.214.71:8080/api/queryCorderBy?type=n&trade=${this.queryType}&title=${this.searchWd}&offset=${this.offset}`).then((response) => {
          if (response.data.statusCode === '200') {
            let list = []
            for (let i of response.data.data) {
              list.push(i)
            }
            this.needList = this.needList.concat(list)
            console.log(this.needList)
            this.offset += 10
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }).catch(() => {
          console.log('need err')
        })
      }
    },
    listenScroll(pos) {
      if (pos.y >= -100) {
        this.sortBoxVisiable = true
      } else {
        this.sortBoxVisiable = false
      }
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    },
    getNeedList() {
      this.offset = 0
      this.$http.get(`http://47.95.214.71:8080/api/queryCorderBy?type=n&trade=${this.queryType}&title=${this.searchWd}&offset=0`).then((response) => {
        this.needList = response.data.data
        console.log(this.needList)
      }).catch(() => {
        console.log('need err')
      })
    },
    getServiceList() {
      this.offset = 0
      this.$http.get(`http://47.95.214.71:8080/api/queryCorderBy?type=s&trade=${this.queryType}&title=${this.searchWd}&offset=0`).then((response) => {
        this.serviceList = response.data.data
        console.log(this.serviceList)
      }).catch(() => {
        console.log('service err')
      })
    }
  },
  created() {
    if (this.listMode) {
      this.selectMode = this.listMode
    } else {
      store.commit('changeListMode', '2')
    }
    this.getNeedList()
    this.getServiceList()
  },
  mounted() {
    this.$nextTick(() => {
      this._initSortScroll()
    })
  },
  components: {
    Scroll,
    serviceListCard,
    needListCard
  },
  watch: {
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
    }
  },
  computed: {
    scrollbarObj: function() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop),
        txt: '更新成功'
      } : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        stop: parseInt(this.pullUpRefreshStop),
        txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
      } : false
    },
    queryType() {
      switch (this.activeSort) {
        case 'all':
          return ''
        case 'home':
          return '家政'
        case 'edu':
          return '教育'
        case 'net':
          return '互联网'
        case 'life':
          return '生活'
        case 'design':
          return '设计'
        case 'other':
          return '其他'
        default:
          return 'ERR'
      }
    },
    listMode() {
      return store.state.listMode
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.list {
  overflow-y: hidden;
  width: 100%;
  min-height: 100%;

  .head-bar {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    background: #f9fafc;

    .select {
      width: 80px;
    }
  }

  .sort-wrapper {
    position: fixed;
    z-index: 1;
    width: 100%;
    overflow: hidden;
    background: #F9FAFC;

    .sort-box {
      width: 490px;
      font-size: 0;
      white-space: nowrap;

      .sort-item {
        display: inline-block;
        box-sizing: border-box;
        margin-top: 4px;
        padding-top: 10px;
        height: 70px;
        width: 70px;
        font-size: 0;
        text-align: center;
        color: #475669;
        font-weight: 200;
        white-space: normal;
        transition: 0.3s;

        .icon {
          display: inline-block;
          font-size: 30px;
          vertical-align: middle;
        }

        .tag {
          display: inline-block;
          margin-top: 5px;
          font-size: 14px;
        }

        &.active {
          color: #F9FAFC;
          background: #20A0FF;
        }
      }
    }
  }

  .list-group {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    background: #ededed;
  }

  .list-scroller {
    position: absolute;
    top: 73px;
    bottom: 48px;
    width: 100%;
    background: #ededed;

    &.long-mode {
      top: 0px;
      bottom: 48px;
    }

    .list {
    }
  }
}
</style>
