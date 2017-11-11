<template>
  <div class="published-order">
    <headerPage title="已发布订单">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="服务" name="service" class="service-tab">
          <ul class="service-list" v-if="serviceList && serviceList.length !== 0">
            <li v-for="(item, index) in serviceList" :key="index">
              <serviceListCard :deleteIcon="true" :data="item" @deleteCorder="deleteCorderCheck"></serviceListCard>
            </li>
          </ul>
          <div v-else>
            <h1 class="no-content">这里空空如也～</h1>
          </div>
        </el-tab-pane>
        <el-tab-pane label="需求" name="need" class="need-tab">
          <ul class="need-list" v-if="needList && needList.length !== 0">
            <li v-for="(item, index) in needList" :key="index">
              <needListCard :deleteIcon="true" :data="item" @deleteCorder="deleteCorderCheck"></needListCard>
            </li>
          </ul>
          <div v-else>
            <h1 class="no-content">这里空空如也～</h1>
          </div>
        </el-tab-pane>
      </el-tabs>
    </headerPage>
    <el-dialog class="dialog" title="删除自己发布的订单" :visible.sync="deleteDialogVisible" width="90%">
      <p class="content">
        <i class="icon el-icon-warning"></i>您确定要永久删除此订单吗？
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCorder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
import serviceListCard from 'components/ServiceListCard'
import needListCard from 'components/NeedListCard'
export default {
  name: 'PublishedOrder',
  data() {
    return {
      deleteDialogVisible: false,
      activeName: 'service',
      serviceList: [],
      needList: [],
      tempDeleteObj: null
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    handleClick(tab, event) {
      console.log(this.activeName)
      this.activeName === 'service' ? this.getServiceList() : this.getNeedList()
    },
    getServiceList() {
      this.$http
        .get(`http://47.95.214.71:8080/api/queryCorderListById?uid=${this.uid}&type=s`)
        .then(response => {
          this.serviceList = response.data.data.filter(item => {
            return item.isValid === 1
          })
          console.log('get service')
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error',
            duration: 2000
          })
        })
    },
    getNeedList() {
      this.$http
        .get(`http://47.95.214.71:8080/api/queryCorderListById?uid=${this.uid}&type=n`)
        .then(response => {
          this.needList = response.data.data.filter(item => {
            return item.isValid === 1
          })
          console.log('get need')
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error',
            duration: 2000
          })
        })
    },
    deleteCorderCheck(obj) {
      console.log('event', obj)
      this.tempDeleteObj = obj
      this.deleteDialogVisible = true
    },
    deleteCorder() {
      this.$http
        .post('http://47.95.214.71:8080/api/updateCorderIsValidById', qs.stringify(this.tempDeleteObj), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        })
        .then(response => {
          console.log(response.data)
          this.goBack()
          this.$message({
            message: '订单删除成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    headerPage,
    serviceListCard,
    needListCard
  },
  computed: {
    uid() {
      return store.state.uID
    }
  },
  created() {
    this.getServiceList()
    this.getNeedList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.published-order {
  top: 0;
  bottom: 0;
  background: #ededed;

  .tabs {
    .el-tabs__header {
      margin: 0;

      .el-tabs__nav {
        width: 100%;
        background: #fff;

        .el-tabs__item {
          width: 50%;
          text-align: center;
        }
      }
    }

    .el-tabs__content {
      .service-tab {
        padding: 1px 0;
        background: #ededed;
      }

      .need-tab {
        padding: 1px 0;
        background: #ededed;
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

  .dialog {
    .content {
      line-height: 30px;

      .icon {
        margin-right: 10px;
        font-size: 30px;
        color: #F7BA2A;
      }
    }
  }
}
</style>