<template>
  <div class="login">
    <h1 class="title">人人帮</h1>
    <el-form :model="formInline" class="form">
      <el-form-item label="用户名">
        <el-input size="large" v-model="formInline.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" size="large" v-model="formInline.password"></el-input>
      </el-form-item>
      <el-form-item width="100%">
        <el-button class="login-btn" type="primary" size="large" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="other-control">
      <router-link to="/foget">
        <el-button class="foget" type="text" size="large">
          忘记密码
        </el-button>
      </router-link>
      <router-link to="/signin">
        <el-button class="sign-in" type="text" size="large">注册</el-button>
      </router-link>
    </div>
    <!-- <input type="file" id="take-picture" accept="image/*"> -->
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'login',
  data() {
    return {
      formInline: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formInline)
      router.push('/home/list')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.login
  padding 70px 12px 0 12px
  .title
    line-height 100px
    font-size 40px
    text-align center
  .form
    .login-btn
      width 100%
  .other-control
    margin-top -15px
    .foget
      float left
    .sign-in
      float right
</style>
