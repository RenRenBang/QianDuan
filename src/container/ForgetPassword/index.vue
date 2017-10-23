<template>
  <div class="forget">
    <headerPage title="重置密码">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm">
        <el-form-item label="手机号" prop="uphone" ref="uphone">
          <el-input size="large" v-model.trim="ruleForm.uphone" :disabled="telNumDisabled">
            <el-button slot="append" type="primary" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input size="large" v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" size="large" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" size="large" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <div class="btn-group">
          <el-button size="large" class="forget-btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <br>
          <el-button size="large" class="forget-btn" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </headerPage>
  </div>
</template>

<script>
import qs from 'qs'
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'forget',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateTelNum = (rule, value, callback) => {
      if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
        this.sendCodeDisabled = true
        callback(new Error('输入的手机号有误'))
      } else {
        this.sendCodeDisabled = false
        callback()
      }
    }
    return {
      sendCodeText: '发送验证码',
      telNumDisabled: false,
      sendCodeDisabled: true,
      ruleForm: {
        uphone: '',
        code: '',
        password: '',
        checkPass: ''
      },
      rules: {
        uphone: [{ required: true, validator: validateTelNum }],
        code: [{ required: true, message: '请输入您的手机收到的验证码', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('http://47.95.214.71:8080/api/updatePassword', qs.stringify(this.postForm), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            })
            .then(response => {
              console.log(response.data)
              if (response.data.statusCode === '200') {
                router.go(-1)
                this.$message({
                  message: '恭喜，注册成功',
                  type: 'success',
                  duration: 2000
                })
              } else if (response.data.statusCode === '300') {
                this.$message({
                  message: '验证码有问题呦～',
                  type: 'error',
                  duration: 2000
                })
              } else {
                this.$message({
                  message: '这个手机号还没注册过',
                  type: 'error',
                  duration: 2000
                })
              }
            })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error',
                duration: 2000
              })
            })
        } else {
          this.$message({
            message: '重置失败，好好检查一下吧',
            type: 'error',
            duration: 2000
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.sendCodeDisabled = true
    },
    sendCode() {
      this.$http
        .post('http://47.95.214.71:8080/api/getCheckCode2', qs.stringify({ uphone: this.ruleForm.uphone }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        })
        .then(response => {
          console.log(this.ruleForm.uphone)
          this.$message({
            message: '验证码已发送',
            type: 'success',
            duration: 1500
          })
          this.telNumDisabled = true
          this.sendCodeDisabled = true
          this.time = 0
          let that = this
          let lastTime = 120
          this.sendCodeText = `请${lastTime - this.time}秒后再重新发送`
          let interval = setInterval(() => {
            that.time += 1
            that.sendCodeText = `请${lastTime - that.time}秒后再重新发送`
            if (that.time >= lastTime) {
              clearInterval(interval)
              this.telNumDisabled = false
              this.sendCodeDisabled = false
              that.sendCodeText = '发送验证码'
            }
          }, 1000)
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error',
            duration: 2000
          })
        })
    }
  },
  components: {
    headerPage
  },
  computed: {
    uploadFileExDataFront() {
      return {
        uid: this.uid,
        idNumber: this.ruleForm.idNumber,
        sign: 0
      }
    },
    uploadFileExDataBack() {
      return {
        uid: this.uid,
        idNumber: this.ruleForm.idNumber,
        sign: 1
      }
    },
    postForm() {
      return {
        uphone: this.ruleForm.uphone,
        checkCode: this.ruleForm.code,
        password: this.ruleForm.password
      }
    }
  }
}
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.forget {
  padding: 10px 12px 0 12px;

  .form {
    .btn-group {
      font-size: 0;

      .forget-btn {
        margin: 5px 0;
        width: 100%;
      }
    }

    .upload {
    }
  }
}
</style>
