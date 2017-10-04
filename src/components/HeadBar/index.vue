<template>
  <div class="head-bar shadow">
    <el-input placeholder="请输入内容" v-model="searchWd" icon="search" :on-icon-click="handleSearch">
      <el-select v-model="selectMode" slot="prepend" placeholder="请选择">
        <el-option label="服务" value="1"></el-option>
        <el-option label="需求" value="2"></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'head-bar',
  data() {
    return {
      searchWd: '',
      selectMode: '1'
    }
  },
  methods: {
    handleSearch() {
      console.log(this.searchWd)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.head-bar
  box-sizing border-box
  padding 10px
  width 100%
  background #f9fafc

.head-bar .el-select .el-input {
  width: 90px;
}
</style>
