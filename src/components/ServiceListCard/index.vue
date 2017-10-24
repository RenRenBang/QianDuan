<template>
  <div class="service-list-card">
    <router-link :to="`/ServiceDetail/${data.oid}`">
      <el-card v-if="data" :body-style="{'padding': '8px 15px'}">
        <h1 class="title" slot="header">{{data.title}}
          <el-tag type="primary" class="tag">{{data.trade}}</el-tag>
        </h1>
        <div class="provider" v-if="cuser">
          <img :src="'http://47.95.214.71' + cuser.image" alt="avatar" class="avatar">
          <span class="name">{{cuser.nickname}}</span>
          <el-button type="text" size="large" @click.stop.self="deleteThis">
            <i v-if="deleteIcon" class="delete el-icon-delete"></i>
          </el-button>
        </div>
        <div class="price">
          <div v-if="data.money === 0">
            免费
          </div>
          <div v-else>
            {{data.money}} 元/次
          </div>
        </div>
        <div class="detail clearfix">
          <span class="buy-num">{{data.gmNum}}人购买&nbsp;&nbsp;&nbsp;|</span>
          <span class="like-num">{{data.collNum}}人喜欢</span>
          <span class="location">
            <i class="icon icon-location-arrow"></i>{{data.address}}
          </span>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
import qs from 'qs'
import router from '@/router'
export default {
  name: 'serviceListCard',
  props: {
    data: {
      type: Object
    },
    deleteIcon: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cuser: null
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    deleteThis() {
      this.$http
        .post('http://47.95.214.71:8080/api/updateCorderIsValidById', qs.stringify(this.deleteObj), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        })
        .then(response => {
          console.log(response.data)
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
  mounted() {
    this.$http
      .get(`http://47.95.214.71:8080/api/queryCorderById?oid=${this.data.oid}`)
      .then(response => {
        this.cuser = response.data.data[0].cuser
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    deleteObj() {
      return {
        isValid: 0,
        oid: this.data.oid
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.service-list-card {
  box-sizing: border-box;
  padding: 0 10px;
  margin: 10px 0;

  .title {
    font-size: 24px;
    text-align: left;

    .tag {
      margin-left: 10px;
      vertical-align: top;
    }
  }

  .provider {
    font-size: 0;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .name {
      margin-left: 10px;
      font-size: 18px;
      font-weight: 200;
      line-height: 50px;
      vertical-align: top;
    }

    .delete {
      display: inline-block;
      font-size: 28px;
      line-height: 50px;
      vertical-align: top;
      float: right;
      color: #FF4949;
    }
  }

  .price {
    margin: 10px 0;
    font-size: 20px;
    color: #FF6F00;
  }

  .detail {
    width: 100%;
    color: #8492A6;
    line-height: 24px;

    .buy-num {
      float: left;
      padding-right: 10px;
      font-size: 14px;
    }

    .like-num {
      float: left;
      font-size: 14px;
    }

    .location {
      float: right;
      max-width: 173px;
      text-align: right;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      .icon {
        font-size: 20px;
        margin-right: 10px;
        vertical-align: sub;
      }
    }
  }
}
</style>
