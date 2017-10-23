<template>
  <div class="need-list-card">
    <router-link :to="`/NeedDetail/${data.oid}`">
      <el-card v-if="data" :body-style="{'padding': '10px 20px'}">
        <h1 class="title" slot="header">{{data.title}}
          <el-tag type="primary" class="tag">{{data.trade}}</el-tag>
        </h1>
        <div class="provider" v-if="cuser">
          <img :src="'http://47.95.214.71' + cuser.image" alt="avatar" class="avatar">
          <span class="name">{{cuser.nickname}}</span>
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
import router from '@/router'
export default {
  name: 'needListCard',
  props: {
    data: {
      type: Object
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
    }
  },
  mounted() {
    this.$http.get(`http://47.95.214.71:8080/api/queryCorderById?oid=${this.data.oid}`).then((response) => {
      this.cuser = response.data.data[0].cuser
    }).catch((err) => {
      console.log(err)
    })
  },
  computed: {
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
      max-width: 220px;
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
