<template>
  <div class="edit-userinfo">
    <headerPage title="修改个人信息">
      <div class="upload">
        <el-upload class="avatar-uploader" name="file" ref="upload" action="http://47.95.214.71:8080/api/onefile2" :data="uploadFileExData" list-type="picture" :on-change="handleUploadChange" :auto-upload="false" accept="image/*" :show-file-list="false">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm" v-if="cuser">
        <el-form-item label="昵称" prop="nickName">
          <el-input size="large" v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="profile">
          <el-input type="textarea" :autosize="{ minRows: 2}" v-model.trim.number="ruleForm.profile" placeholder="SHOW 出你自己～"></el-input>
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
import qs from 'qs'
import HeaderPage from 'components/HeaderPage'
export default {
  name: 'EditUserInfo',
  data() {
    return {
      avatarUrl: undefined,
      cuser: undefined,
      ruleForm: {
        nickName: '网名',
        uphone: null,
        profile: null
      },
      rules: {
        nickName: [{ required: true, message: '请输入您的昵称', trigger: 'blur' }, { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }],
        profile: [{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(`http://47.95.214.71:8080/api/updateNameAndNick`, qs.stringify(this.postObj), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            })
            .then(response => {
              console.log(response.data.data)
              this.submitUpload()
              console.log(this.ruleForm)
              this.$notify({
                title: '成功',
                message: '修改个人信息成功',
                type: 'success'
              })
              this.$router.go(-1)
            })
            .catch(err => {
              this.$message({
                message: err,
                type: 'error',
                duration: 2000
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleUploadChange(file, fileList) {
      this.avatarUrl = URL.createObjectURL(file.raw)
    },
    submitUpload() {
      this.$refs.upload.submit()
    }
  },
  components: {
    HeaderPage
  },
  computed: {
    uid() {
      return this.$store.state.uID
    },
    uploadFileExData() {
      return {
        uid: this.uid,
        uphone: this.ruleForm.uphone
      }
    },
    postObj() {
      return {
        uid: this.uid,
        nickname: this.ruleForm.nickName,
        password: '',
        profile: this.ruleForm.profile
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
        this.ruleForm.profile = this.cuser.profile
        this.avatarUrl = 'http://47.95.214.71' + this.cuser.image
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
<style lang="stylus" scoped>
avatar-size = 130px
.edit-userinfo {
  padding: 20px 12px 0 12px;

  .upload {
    text-align: center;

    .avatar-uploader {
      display: inline-block;
      border: 1px dashed #d9d9d9;
      border-radius: 50%;
      height: avatar-size;
      font-size: 0;

      .el-upload--picture {
        position: relative;
        width: 100%;
        height: avatar-size;
        overflow: hidden;
        cursor: pointer;

        .avatar {
          display: inline-block;
          border-radius: 50%;
          width: avatar-size;
          height: avatar-size;
          line-height: 100%;
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: avatar-size;
          height: avatar-size;
          line-height: avatar-size;
          text-align: center;
        }
      }

      &:hover {
        border-color: #409EFF;
      }
    }
  }

  .form {
    .btn-group {
      font-size: 0;

      .btn {
        margin: 5px 0;
        width: 100%;
      }
    }
  }
}
</style>
