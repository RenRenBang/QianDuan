<template>
  <div class="service-list-card">
    <listCard :routerLink="`/ServiceDetail/${data.oid}`" :corderData="data" :cuser="cuser" :deleteIcon="deleteIcon" :onDelete="deleteThis">
      <div slot="price">
        <div v-if="data.money === 0">
          免费
        </div>
        <div v-else>
          {{data.money}} 元/次
        </div>
      </div>
      <div slot="detail">
        <span class="buy-num">
          <i class="icon-shopping-cart"></i> {{data.gmNum}}&nbsp;&nbsp;&nbsp;|
        </span>
        <span class="like-num">
          <i class="icon-heart"></i> {{data.collNum}}
        </span>
      </div>
    </listCard>
  </div>
</template>

<script>
import ListCard from 'components/ListCard'
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
    deleteThis() {
      this.$emit('deleteCorder', this.deleteObj)
    },
    updateData() {
      this.$http
        .get(`http://47.95.214.71:8080/api/queryCorderById?oid=${this.data.oid}`)
        .then(response => {
          this.cuser = response.data.data[0].cuser
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.updateData()
  },
  computed: {
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
.service-list-card {
  box-sizing: border-box;
  padding: 0 10px;
  margin: 10px 0;

  .buy-num {
    float: left;
    padding-right: 10px;
    font-size: 14px;
  }

  .like-num {
    float: left;
    font-size: 14px;
  }
}
</style>
