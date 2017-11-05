<template>
  <div class="need-list-card">
    <listCard :routerLink="`/NeedDetail/${data.oid}`" :corderData="data" :cuser="cuser" :deleteIcon="deleteIcon" :onDelete="deleteThis">
      <div slot="price">{{data.money}} 元/人</div>
      <div slot="detail">
        <span v-if="deadline > 0 && data.ocount > 0">
          <span class="deadline">
            {{deadline}}天后失效&nbsp;&nbsp;&nbsp;|
          </span>
          <span class="need-num">需{{data.ocount}}人</span>
        </span>
        <span v-else>
          <span class="deadline">
            <el-tag type="info" size="small">已失效</el-tag>
          </span>
        </span>
      </div>
    </listCard>
  </div>
</template>

<script>
import ListCard from 'components/ListCard'
export default {
  name: 'NeedListCard',
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
    deleteThis() {
      this.$emit('deleteCorder', this.deleteObj)
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
  },
  components: {
    ListCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.need-list-card {
  box-sizing: border-box;
  padding: 0 10px;
  margin: 10px 0;

  .deadline {
    float: left;
    font-size: 14px;
  }

  .need-num {
    float: left;
    padding-left: 10px;
    font-size: 14px;
  }
}
</style>
