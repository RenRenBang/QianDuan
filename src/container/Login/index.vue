<template>
  <div class="login">
    <img src="static/logo.png" alt="" class="logo">
    <h1 class="title">人人帮</h1>
    <el-form :model="loginForm" class="form">
      <el-form-item label="用户名">
        <el-input size="large" v-model="loginForm.uphone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" size="large" v-model="loginForm.upassword"></el-input>
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
import qs from 'qs'
import router from '@/router'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        uphone: '',
        upassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.loginForm)
      this.logIn()
      router.push('/home/list')
    },
    logIn() {
      this.$http.post('http://localhost:8080/api/to_login', qs.stringify(this.loginForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.login
  padding 20px 12px 0 12px
  text-align center
  .logo
    width 170px
  .title
    line-height 45px
    font-size 35px
    font-weight 200
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
