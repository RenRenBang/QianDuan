<template>
  <div class="edit-userinfo">
    <headerPage title="修改个人信息">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm" v-if="cuser">
        <el-form-item label="昵称" prop="nickName">
          <el-input size="large" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item class="upload" label="头像">
          <el-upload name="file" ref="upload" action="http://47.95.214.71:8080/api/onefile2" :data="uploadFileExData" :on-remove="handleRemoveFile" :file-list="file" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
      file: [],
      ruleForm: {
        nickName: '网名',
        uphone: null
      },
      rules: {
        nickName: [
          { required: true, message: '请输入您的昵称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
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
    },
    handleRemoveFile(file, fileList) {
      console.log(file, fileList)
    },
    submitUpload() {
      this.$refs.upload.submit()
    }
  },
  components: {
    headerPage
  },
  computed: {
    uid() {
      return store.state.uID
    },
    uploadFileExData() {
      return {
        uid: this.uid,
        uphone: this.ruleForm.uphone
      }
    }
  },
  mounted() {
    this.$http
      .get(`http://47.95.214.71:8080/api/findByUid?uid=${this.uid}`)
      .then(response => {
        this.cuser = response.data.data[0]
        this.ruleForm.nickName = this.cuser.nickname
        this.ruleForm.uphone = this.cuser.uphone
      })
      .catch(err => {
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
.edit-userinfo {
  padding: 20px 12px 0 12px;

  .form {
    .btn-group {
      font-size: 0;

      .btn {
        margin: 5px 0;
        width: 100%;
      }
    }

    .upload {
    }
  }
}
</style>
