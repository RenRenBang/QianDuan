<template>
  <div class="need-detail">
    <headerPage title="需求详情" v-if="data">
      <div class="brief-info clearfix">
        <div class="title">{{data.title}}
          <el-tag type="primary" class="tag">{{data.trade}}</el-tag>
        </div>
        <div v-if="deadline > 0 && data.ocount > 0">
          <div class="need-people">还需{{data.ocount}}人&nbsp;&nbsp;|</div>
          <div class="deadline">&nbsp;&nbsp;{{deadline}}天后失效</div>
          <div class="price">{{data.money}}元/人</div>
        </div>
        <div v-else>
          <span class="deadline">
            <el-tag type="gray">已失效</el-tag>
          </span>
        </div>
      </div>
      <div class="describe">
        <div class="lable">需求内容</div>
        <p class="text">{{data.odescribe}}</p>
        <div class="img" v-if="data.ophotoPath">
          <img class="img-responsive" :src="`http://47.95.214.71${data.ophotoPath}`" alt="">
        </div>
      </div>
      <div class="provider clearfix">
        <img :src="'http://47.95.214.71' + data.cuser.image" alt="" class="avatar">
        <span class="name">{{data.cuser.name}}</span>
        <br>
        <span class="tel">{{data.cuser.uphone}}</span>
      </div>
      <div class="location">
        <i class="icon icon-location-arrow"></i>
        <span class="name">{{data.address}}</span>
      </div>
      <div class="controler" v-if="deadline > 0 && data.ocount > 0">
        <el-popover ref="popover" placement="top" v-model="popoverVisible" popper-class="popover" width="300" v-if="data.cuser.uid !== uid">
          <p class="text">
            <i class="icon el-icon-warning"></i> 您确定要参与此需求吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" type="text" @click="popoverVisible = false">我再看看</el-button>
            <el-button type="primary" size="small" @click="submitOrder">确定</el-button>
          </div>
        </el-popover>
        <el-popover ref="popover" placement="top" v-model="popoverVisible" popper-class="popover" width="300" v-else>
          <p class="text">
            <i class="icon el-icon-warning"></i> 你没法参与自己发布的需求呦～
          </p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="small" @click="popoverVisible = false">确定</el-button>
          </div>
        </el-popover>
        <div class="submit-btn" v-popover:popover>我要参与</div>
      </div>
    </headerPage>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'needDetail',
  data() {
    return {
      data: undefined,
      popoverVisible: false
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    submitOrder() {
      this.$http
        .get(`http://47.95.214.71:8080/api/addTransaction?uid=${this.uid}&oid=${this.$route.params.id}`)
        .then(response => {
          console.log(response.data)
          this.$notify({
            title: '成功',
            message: '已参与此需求',
            type: 'success',
            duration: 1500
          })
          router.push('/home/list')
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error',
            duration: 2000
          })
        })
    }
  },
  components: {
    headerPage
  },
  created() {
    this.$http
      .get(`http://47.95.214.71:8080/api/queryCorderById?oid=${this.$route.params.id}`)
      .then(response => {
        this.data = response.data.data[0]
        console.log('data.cuser.uid !== uid', this.data.cuser.uid !== this.uid)
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    uid() {
      return store.state.uID
    },
    deadline() {
      if (!this.data.endTime) {
        return 'err'
      }
      return Math.ceil(new Date(this.data.endTime - new Date().getTime()).getTime() / 1000 / 60 / 60 / 24)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.need-detail {
  box-sizing: border-box;
  padding-bottom: 40px;
  min-height: 100%;
  background: #ededed;

  .brief-info {
    box-sizing: border-box;
    padding: 10px 25px;
    width: 100%;
    background: #fff;

    .title {
      margin-bottom: 5px;
      font-size: 24px;
      line-height: 30px;

      .tag {
        margin-left: 10px;
        margin-top: 4px;
        vertical-align: top;
      }
    }

    .need-people {
      float: left;
      font-size: 14px;
      line-height: 30px;
      color: #475669;
    }

    .deadline {
      float: left;
      font-size: 14px;
      line-height: 30px;
      color: #475669;
    }

    .price {
      float: right;
      font-size: 14px;
      line-height: 30px;
      color: #FF6F00;
    }
  }

  .describe {
    margin-top: 10px;
    padding: 15px 25px;
    background: #fff;

    .lable {
      font-size: 18px;
      line-height: 25px;
    }

    .text {
      font-size: 14px;
      font-weight: 200;
      line-height: 20px;
      color: #475669;
    }

    .img {
      margin-top: 10px;
    }
  }

  .provider {
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 25px;
    width: 100%;
    background: #fff;

    .avatar {
      float: left;
      margin-right: 10px;
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }

    .name {
      font-size: 18px;
      font-weight: 200;
      line-height: 35px;
    }

    .tel {
      font-size: 17px;
    }
  }

  .location {
    margin-top: 10px;
    padding: 10px 25px;
    color: #475669;
    line-height: 30px;
    background: #fff;

    .icon {
      font-size: 24px;
      vertical-align: middle;
    }

    .name {
      font-size: 18px;
      font-weight: 200;
      vertical-align: middle;
    }
  }

  .controler {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;

    .submit-btn {
      width: 100%;
      color: #fff;
      font-size: 20px;
      background: #20A0FF;
    }
  }
}

.popover {
  .text {
    font-size: 17px;
    font-weight: 200;
    line-height: 30px;

    .icon {
      color: #F7BA2A;
    }
  }
}
</style>
