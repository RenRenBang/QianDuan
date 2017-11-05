<template>
  <div class="list-card">
    <router-link :to="routerLink">
      <el-card :body-style="{'padding': '8px 20px'}">
        <h1 class="title" slot="header">{{corderData.title}}
          <el-tag class="tag" size="small">{{corderData.trade}}</el-tag>
        </h1>
        <div class="provider" v-if="cuser">
          <img :src="'http://47.95.214.71' + cuser.image" alt="avatar" class="avatar">
          <span class="name">{{cuser.nickname}}</span>
          <el-button v-if="deleteIcon" type="text" size="large" @click.stop.native.prevent="onDelete" class="delete">
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
        <div class="price">
          <slot name="price"></slot>
        </div>
        <div class="detail clearfix">
          <slot name="detail" class="detail-info"></slot>
          <span class="location">
            <i class="icon icon-location-arrow"></i>{{corderData.address}}
          </span>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    routerLink: {
      type: String
    },
    corderData: {
      type: Object
    },
    cuser: {
      type: Object
    },
    deleteIcon: {
      type: Boolean,
      default: false
    },
    onDelete: {
      type: Function
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.list-card {
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

    .detail-info {
      width: 30%;
    }

    .location {
      float: right;
      max-width: 65%;
      text-align: right;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      .icon {
        font-size: 20px;
        margin-right: 5px;
        vertical-align: sub;
      }
    }
  }
}
</style>
