<template>
  <div class="signin">
    <headerPage title="用户注册">
      <el-form :model="ruleForm" class="form" :label-position="'left'" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="昵称" prop="nickName">
          <el-input size="large" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telNum">
          <el-input size="large" v-model.trim.number="ruleForm.telNum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input size="large" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input size="large" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input size="large" v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item class="upload" label="身份证" prop="idCard">
          <!-- <el-input type="file" accept="image/*" v-model="ruleForm.idCard"></el-input> -->
          <!-- <el-input type="file" accept="image/*" v-model="ruleForm.idCard"></el-input> -->
          <el-upload class="idcard-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="idcard">
            <i v-else class="el-icon-plus idcard-uploader-icon">&nbsp;在这里添加身份证正面照片</i>
          </el-upload>
          <el-upload class="idcard-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="idcard">
            <i v-else class="el-icon-plus idcard-uploader-icon">&nbsp;在这里添加身份证背面照片</i>
          </el-upload>
        </el-form-item>
        <div class="btn-group">
          <el-button size="large" class="signin-btn" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <br>
          <el-button size="large" class="signin-btn" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'signin',
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        nickName: '',
        telNum: null,
        pass: '',
        checkPass: '',
        realName: '',
        idCard: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        telNum: [
          { required: true, message: '请输入正确的手机号', trigger: 'change', type: 'number' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入您的真实姓名', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      router.go(-1)
    }
  },
  components: {
    headerPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.signin
  padding 70px 12px 0 12px
  .top-bar
    position fixed
    top 0
    left 0
    right 0
    z-index 2000
    text-align center
    background #F9FAFC
    .back-btn
      display inline-block
      padding 15px
      float left
      font-size 20px
    .title
      display inline-block
      margin-left -30px
      font-size 20px
      line-height 50px
      vertical-align top
  .form
    .btn-group
      font-size 0
      .signin-btn
        margin 5px 0
        width 100%
    .upload
      .idcard-uploader
        .el-upload
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          width: 100%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover
            border-color: #20a0ff;
        .idcard-uploader-icon
          font-size: 18px;
          color: #8c939d;
          width: 100%;
          height: 178px;
          line-height: 178px;
          text-align: center;
        .idcard
          width: 100%;
          height: 178px;
          display: block;
</style>
