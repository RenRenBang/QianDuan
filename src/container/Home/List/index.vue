<template>
  <div class="list">
    <div class="head-bar shadow">
      <el-input placeholder="请输入内容" v-model="searchWd">
        <el-select v-model="selectMode" slot="prepend" placeholder="请选择" class="select" @change="handleSelect">
          <el-option label="需求" value="n"></el-option>
          <el-option label="服务" value="s"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </div>
    <transition name="fade" mode="in-out">
      <div ref="sort-wrapper" class="sort-wrapper" v-show="sortBoxVisiable">
        <ul class="sort-box">
          <li class="sort-item" :class="{'active shadow' : activeSort === ''}" @click="sortActive('')">
            <i class="icon icon-th-large"></i><br>
            <span class="tag">全部</span>
          </li>
          <li class="sort-item" :class="{'active shadow' : activeSort === '家政'}" @click="sortActive('家政')">
            <i class="icon icon-home"></i><br>
            <span class="tag">家政</span>
          </li>
          <li class="sort-item" :class="{'active shadow' : activeSort === '教育'}" @click="sortActive('教育')">
            <i class="icon icon-graduation-cap"></i><br>
            <span class="tag">教育</span>
          </li>
          <li class="sort-item" :class="{'active shadow' : activeSort === '互联网'}" @click="sortActive('互联网')">
            <i class="icon icon-globe"></i><br>
            <span class="tag">互联网</span>
          </li>
          <li class="sort-item" :class="{'active shadow' : activeSort === '生活'}" @click="sortActive('生活')">
            <i class="icon icon-coffee"></i><br>
            <span class="tag">生活</span>
          </li>
          <li class="sort-item" :class="{'active shadow' : activeSort === '设计'}" @click="sortActive('设计')">
            <i class="icon icon-pencil"></i><br>
            <span class="tag">设计</span>
          </li>
          <li class="sort-item" :class="{'active' : activeSort === '其他'}" @click="sortActive('其他')">
            <i class="icon icon-certificate"></i><br>
            <span class="tag">其他</span>
          </li>
        </ul>
      </div>
    </transition>

    <div key="list" class="list-group" v-loading.fullscreen.lock="!currentList" element-loading-text="拼命加载中">
      <scroll ref="scroll" v-if="currentList && (currentList.length > 0)" class="list-scroller" :class="{'long-mode': !sortBoxVisiable}" :data="currentList" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :listenScroll="true" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp" @scroll="listenScroll">
        <transition name="el-fade-in-linear">
          <ul class="service-list list" v-if="selectMode === 's'">
            <li v-for="(item, index) in currentList" :key="index">
              <serviceListCard :data="item"></serviceListCard>
            </li>
          </ul>
        </transition>
        <transition name="el-fade-in-linear">
          <ul class="need-list list" v-if="selectMode === 'n'">
            <li v-for="(item, index) in currentList" :key="index">
              <needListCard :data="item"></needListCard>
            </li>
          </ul>
        </transition>
      </scroll>
      <div v-else>
        <h1 class="no-content">这里空空如也～</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import BScroll from 'better-scroll'
import Scroll from 'components/scroll/scroll'
import ServiceListCard from 'components/ServiceListCard'
import NeedListCard from 'components/NeedListCard'
import { ease } from 'assets/js/ease.js'
export default {
  name: 'list',
  data() {
    return {
      searchWd: '',
      selectMode: 'n',
      activeSort: '',
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
      scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
      itemIndex: 0
    }
  },
  methods: {
    clearFocus() {
      // 用于清除可恶的软键盘
      document.activeElement.blur()
    },
    sortActive(v) {
      this.activeSort = v
      this.$store.dispatch({
        type: 'changeCurrentSort',
        currentSort: this.activeSort
      })
      this.refreshCurrentList()
      this.clearFocus()
    },
    handleSelect() {
      this.refreshCurrentList()
      this.scrollTo()
      this.rebuildScroll()
      this.$store.dispatch({
        type: 'changeListMode',
        newMode: this.selectMode
      })
    },
    _initSortScroll() {
      if (!this.sortScroll) {
        this.sortScroll = new BScroll(this.$refs['sort-wrapper'], { scrollX: true, click: true, scrollY: false, bounce: false })
      } else {
        this.sortScroll.refresh()
      }
    },
    handleSearch() {
      console.log(this.searchWd)
      this.refreshCurrentList()
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(0, 0, 700, ease['bounce'])
    },
    onPullingDown() {
      // 下拉更新数据
      console.log('pulling down and load data')
      this.refreshCurrentList()
    },
    onPullingUp() {
      // 上拉加载数据
      console.log('pulling up and load data')
      this.updateCurrentList()
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
    refreshCurrentList() {
      this.$http
        .get(`http://47.95.214.71:8080/api/queryCorderBy?type=${this.selectMode}&trade=${this.activeSort}&title=${this.searchWd}&offset=0`)
        .then(response => {
          if (response.data.data) {
            this.$store.dispatch({
              type: 'updateList',
              listType: this.selectMode,
              newList: response.data.data
            })
          } else {
            this.$store.dispatch({
              type: 'updateList',
              listType: this.selectMode,
              newList: []
            })
            console.log('BAD_UPDATE_LIST_', this.selectMode, 'BECAUSE_NO_MORE_DATA')
          }
          console.log(response.data.data)
        })
        .catch(() => {
          console.log('BAD_UPDATE_LIST_', this.selectMode)
        })
    },
    updateCurrentList() {
      let currentList = this.selectMode === 's' ? this.serviceList : this.needList
      let offset = currentList.length
      this.$http
        .get(`http://47.95.214.71:8080/api/queryCorderBy?type=${this.selectMode}&trade=${this.activeSort}&title=${this.searchWd}&offset=${offset}`)
        .then(response => {
          if (response.data.statusCode === '200') {
            this.$store.dispatch({
              type: 'updateList',
              listType: this.selectMode,
              newList: currentList.concat(response.data.data)
            })
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
            console.log('BAD_UPDATE_LIST_', this.selectMode, 'BECAUSE_NO_MORE_DATA')
          }
          console.log(this.selectMode === 's' ? this.serviceList : this.needList)
        })
        .catch(() => {
          console.log('BAD_UPDATE_LIST_', this.selectMode)
        })
    }
  },
  created() {
    let that = this
    // 为了增强性能，只有第一次create才会重新请求列表数据
    let initList = async function() {
      await that.refreshCurrentList()
      that.$store.dispatch({
        type: 'initList'
      })
    }
    if (!this.alreadyInit) {
      initList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initSortScroll()
    })
  },
  components: {
    Scroll,
    ServiceListCard,
    NeedListCard
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
    ...mapState({
      alreadyInit: state => state.list.alreadyInit,
      listMode: state => state.list.listMode,
      serviceList: state => state.list.serviceList,
      needList: state => state.list.needList
    }),
    ...mapGetters(['currentList']),
    scrollbarObj: function() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh
        ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            stop: parseInt(this.pullDownRefreshStop),
            txt: '更新成功'
          }
        : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            stop: parseInt(this.pullUpRefreshStop),
            txt: { more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt }
          }
        : false
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

  .no-content {
    text-align: center;
    margin-top: 140px;
    font-size: 19px;
    font-weight: 200;
    color: #99A9BF;
  }
}
</style>
