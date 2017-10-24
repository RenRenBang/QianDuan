<template>
  <div class="need-list-card">
    <router-link :to="`/NeedDetail/${data.oid}`">
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
        <div class="price">{{data.money}} 元/人</div>
        <div class="detail clearfix">
          <span v-if="deadline > 0 && data.ocount > 0">
            <span class="deadline">
              {{deadline}}天后失效&nbsp;&nbsp;&nbsp;|
            </span>
            <span class="need-num">需{{data.ocount}}人</span>
          </span>
          <span v-else>
            <span class="deadline">
              <el-tag type="gray">已失效</el-tag>
            </span>
          </span>
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
  name: 'needListCard',
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
    deadline() {
      if (!this.data.endTime) {
        return 'err'
      }
      return Math.ceil(new Date(this.data.endTime - new Date().getTime()).getTime() / 1000 / 60 / 60 / 24)
    },
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
.need-list-card {
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
      display: inline-blcok;
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

    .deadline {
      float: left;
      font-size: 14px;
    }

    .need-num {
      float: left;
      padding-left: 10px;
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
