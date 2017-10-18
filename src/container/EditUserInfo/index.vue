<template>
  <div class="edit-userinfo">
    <headerPage title="修改个人信息">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm" v-if="cuser">
        <el-form-item label="昵称" prop="nickName">
          <el-input size="large" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item class="upload" label="头像" prop="avatar">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false">
            <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input size="large" v-model.trim.number="cuser.uphone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input size="large" v-model="cuser.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input size="large" v-model.trim="cuser.idNumber" :disabled="true"></el-input>
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
// import qs from 'qs'
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'editUserInfo',
  data() {
    return {
      cuser: undefined,
      ruleForm: {
        nickName: '网名',
        avatar: null
      },
      rules: {
        nickName: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.$notify({
            title: '成功',
            message: '修改个人信息成功',
            type: 'success'
          })
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
  },
  computed: {
    uid() {
      return store.state.uID
    }
  },
  mounted() {
    this.$http.get(`http://47.95.214.71:8080/api/findByUid?uid=${this.uid}`).then((response) => {
      this.cuser = response.data.data[0]
    }).catch((err) => {
      this.$message({
        message: err,
        type: 'error',
        duration: 2000
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.edit-userinfo
  padding 20px 12px 0 12px
  .form
    .btn-group
      font-size 0
      .btn
        margin 5px 0
        width 100%
    .upload
      .avatar-uploader
        .el-upload
          border: 1px dashed #d9d9d9
          border-radius: 6px
          width: 178px
          cursor: pointer
          position: relative
          overflow: hidden
          &:hover
            border-color: #20a0ff
        .avatar-uploader-icon
          font-size: 18px
          color: #8c939d
          width: 178px
          height: 178px
          line-height: 178px
          text-align: center
        .avatar
          width: 178px
          height: 178px
          display: block
</style>
