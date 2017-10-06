<template>
  <div class="edit-userinfo">
    <headerPage title="修改个人信息">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm">
        <el-form-item label="昵称" prop="nickName">
          <el-input size="large" v-model="ruleForm.nickName" placeholder="更改后的昵称"></el-input>
        </el-form-item>
        <div class="btn-group">
          <el-button size="large" class="btn" type="primary" @click="submitForm('ruleForm')">确认更改</el-button>
          <br>
          <el-button size="large" class="btn" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'editUserInfo',
  data() {
    return {
      ruleForm: {
        nickName: ''
      },
      rules: {
        nickName: [
          { required: true, message: '这里是必填项', trigger: 'blur' },
          { min: 3, message: '不能短于3个字符哦', trigger: 'blur' }
        ],
        needDetail: [
          { required: true, message: '这里是必填项', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.edit-userinfo
  padding 70px 12px 0 12px
  .form
    .btn-group
      font-size 0
      .btn
        margin 5px 0
        width 100%
</style>
