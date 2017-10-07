<template>
  <div class="signin">
    <headerPage title="用户注册">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm">
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
        <el-form-item label="身份证号" prop="idNum">
          <el-input size="large" v-model.trim="ruleForm.idNum"></el-input>
        </el-form-item>
        <el-form-item class="upload" label="身份证照" prop="idCard">
          <!-- <el-input type="file" accept="image/*" v-model="ruleForm.idCard"></el-input> -->
          <!-- <el-input type="file" accept="image/*" v-model="ruleForm.idCard"></el-input> -->
          <el-upload class="idcard-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="idcard">
            <i v-else class="el-icon-plus idcard-uploader-icon">&nbsp在这里添加身份证正面照片</i>
          </el-upload>
          <el-upload class="idcard-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="idcard">
            <i v-else class="el-icon-plus idcard-uploader-icon">&nbsp在这里添加身份证背面照片</i>
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
    var IdentityCodeValid = (rule, code, callback) => {
      code += ''
      var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外 ' }
      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        callback(new Error('身份证号格式错误'))
      } else if (!city[code.substr(0, 2)]) {
        callback(new Error('地址编码错误'))
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
        idNum: null,
        idCard: null
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
        ],
        idNum: [
          { required: true, message: '请输入身份证号', trigger: 'change' },
          { validator: IdentityCodeValid, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          router.go(-1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    headerPage
  }
}
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
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
          border: 1px dashed #d9d9d9
          border-radius: 6px
          width: 100%
          cursor: pointer
          position: relative
          overflow: hidden
          &:hover
            border-color: #20a0ff
        .idcard-uploader-icon
          font-size: 18px
          color: #8c939d
          width: 100%
          height: 178px
          line-height: 178px
          text-align: center
        .idcard
          width: 100%
          height: 178px
          display: block
</style>
