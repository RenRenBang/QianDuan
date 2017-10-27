<template>
  <div class="login">
    <img src="static/img/logo.png" alt="" class="logo">
    <h1 class="title">人人帮</h1>
    <el-form :model="loginForm" class="form">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.uphone" placeholder="您的手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item width="100%">
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="other-control">
      <router-link to="/forgetPassword">
        <el-button class="forget" type="text">
          忘记密码
        </el-button>
      </router-link>
      <router-link to="/signin">
        <el-button class="sign-in" type="text">注册</el-button>
      </router-link>
    </div>
    <div class="copyright">Copyright ©2017 Young Tech. All rights reserved.</div>
  </div>
</template>

<script>
import qs from 'qs'
import router from '@/router'
import store from '@/store'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        uphone: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.loginForm)
      this.$http.post('http://47.95.214.71:8080/api/to_login', qs.stringify(this.loginForm), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        if (response.data.statusCode === '200') {
          this.$message({
            message: '欢迎回来',
            type: 'success',
            duration: 1500
          })
          store.commit('login', response.data.data[0].uid)
          console.log(response.data)
          router.replace('/home/list')
        } else {
          this.$message({
            message: '用户名或密码错误',
            type: 'error',
            duration: 2000
          })
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error',
          duration: 2000
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.login {
  top: 0;
  bottom: 0;
  padding: 30px;
  text-align: center;

  .logo {
    width: 170px;
  }

  .title {
    line-height: 45px;
    font-size: 35px;
    font-weight: 200;
    text-align: center;
  }

  .form {
    .login-btn {
      width: 100%;
    }
  }

  .other-control {
    margin-top: -15px;

    .forget {
      float: left;
    }

    .sign-in {
      float: right;
    }
  }

  .copyright {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    font-size: 12px;
    font-weight: 200;
    color: #475669;
  }
}
</style>
