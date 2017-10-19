<template>
  <div class="service-detail">
    <headerPage title="服务详情" v-if="data">
      <div class="brief-info">
        <div class="title">{{data.title}}
          <el-tag type="primary" class="tag">{{data.trade}}</el-tag>
        </div>
        <div class="price">{{data.money}}</div>
      </div>
      <div class="describe">
        <div class="lable">服务内容</div>
        <p class="text">{{data.odescribe}}</p>
        <div class="img">
          <img class="img-responsive" src="static/img/example.png" alt="">
        </div>
      </div>
      <div class="provider">
        <img :src="'http://47.95.214.71' + data.cuser.image" alt="" class="avatar">
        <span class="name">{{data.cuser.name}}</span>
      </div>
      <div class="location">
        <i class="icon icon-location-arrow"></i>
        <span class="name">{{data.address}}</span>
      </div>
      <div class="controler">
        <el-row>
          <el-col :span="4">
            <div class="collect-btn" @click="collect">
              <i class="icon" :class="{'el-icon-star-off': !isCollect, 'el-icon-star-on': isCollect}"></i>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="submit-btn" @click="submitOrder">立即预约</div>
          </el-col>
        </el-row>
      </div>
    </headerPage>
  </div>
</template>

<script>
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'serviceDetail',
  data() {
    return {
      isCollect: false,
      data: undefined
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    collect() {
      this.isCollect = !this.isCollect
      if (this.isCollect) {
        this.$http.post(`http://47.95.214.71:8080/api/addCollections`, qs.stringify(this.postObj), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).then((response) => {
          console.log(response.data)
          this.$notify({
            title: '成功',
            message: '成功收藏',
            type: 'success',
            duration: 1500
          })
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'error',
            duration: 2000
          })
        })
      } else {
        this.$http.get(`http://47.95.214.71:8080/api/deleteCollections?cid=${this.cid}`).then((response) => {
          console.log(response.data)
          this.$notify({
            title: '成功',
            message: '已经取消收藏',
            type: 'success',
            duration: 1500
          })
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'error',
            duration: 2000
          })
        })
      }
    },
    submitOrder() {
      this.$http.get(`http://47.95.214.71:8080/api/addTransaction?uid=${this.uid}&oid=${this.$route.params.id}`).then((response) => {
        console.log(response.data)
        this.$notify({
          title: '成功',
          message: '服务已预约',
          type: 'success',
          duration: 1500
        })
        router.push('/home/list')
      }).catch((err) => {
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
    this.$http.get(`http://47.95.214.71:8080/api/queryCorderById?oid=${this.$route.params.id}`).then((response) => {
      this.data = response.data.data[0]
    }).catch((error) => {
      console.log(error)
    })
    this.$http.get(`http://47.95.214.71:8080/api/findCidByUidOid?uid=${this.uid}&oid=${this.$route.params.id}`).then((response) => {
      console.log('HERE', response.data)
      if (response.data.tagCode !== 'null') {
        this.isCollect = true
        this.cid = response.data.tagCode
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  computed: {
    uid() {
      return store.state.uID
    },
    postObj() {
      return {
        uid: this.uid,
        oid: this.$route.params.id
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.service-detail {
  box-sizing: border-box;
  padding-bottom: 40px;
  min-height: 100%;
  background: #ededed;

  .brief-info {
    padding: 10px 25px;
    background: #fff;

    .title {
      font-size: 24px;
      line-height: 30px;

      .tag {
        margin-left: 10px;
        margin-top: 4px;
        vertical-align: top;
      }
    }

    .price {
      font-size: 18px;
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
    margin-top: 10px;
    padding: 10px 25px;
    background: #fff;

    .avatar {
      max-width: 60px;
      vertical-align: middle;
      border-radius: 50%;
    }

    .name {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 200;
      vertical-align: middle;
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

    .collect-btn {
      font-size: 20px;
      background: #F9FAFC;
      transition: 1s;

      .icon {
        transition: 0.3s;

        &.el-icon-star-off {
          color: #C6D1DE;
        }

        &.el-icon-star-on {
          color: #F7BA2A;
          font-size: 22px;
        }
      }
    }

    .submit-btn {
      color: #fff;
      font-size: 20px;
      background: #20A0FF;
    }
  }
}
</style>
