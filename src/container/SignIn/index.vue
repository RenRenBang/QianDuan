<template>
  <div class="signin">
    <headerPage title="用户注册">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm">
        <template v-if="step === 1">
          <el-form-item label="昵称" prop="nickname">
            <el-input size="large" v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="uphone" ref="uphone">
            <el-input size="large" v-model.trim="ruleForm.uphone" :disabled="telNumDisabled">
              <el-button slot="append" type="primary" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input size="large" v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" size="large" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" size="large" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input size="large" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idNumber">
            <el-input size="large" v-model.trim="ruleForm.idNumber"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item class="upload" label="身份证照正面">
            <el-upload name="file" ref="upload-front" action="http://47.95.214.71:8080/api/threeFile" :data="uploadFileExDataFront" :on-remove="handleRemoveFileFront" :file-list="fileListFront" list-type="picture" :on-change="handleUploadChangeFront" :auto-upload="false" accept="image/*" :multiple="false">
              <el-button size="small" type="primary" :disabled="uploadBtnDisableFront">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item class="upload" label="身份证照反面">
            <el-upload name="file" ref="upload-back" action="http://47.95.214.71:8080/api/threeFile" :data="uploadFileExDataBack" :on-remove="handleRemoveFileBack" :file-list="fileListBack" list-type="picture" :on-change="handleUploadChangeBack" :auto-upload="false" accept="image/*" :multiple="false" :on-success="handleSuccess">
              <el-button size="small" type="primary" :disabled="uploadBtnDisableBack">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </template>
        <div class="btn-group">
          <el-button size="large" class="signin-btn" type="primary" @click="submitForm('ruleForm')" v-if="step === 1">下一步</el-button>
          <el-button size="large" class="signin-btn" type="primary" @click="submitUpload" v-if="step === 2">完成注册</el-button>
          <br>
          <el-button size="large" class="signin-btn" @click="resetForm('ruleForm')">重置</el-button>
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var IdentityCodeValid = (rule, code, callback) => {
      code += ''
      var city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
      }
      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        callback(new Error('身份证号格式错误'))
      } else if (!city[code.substr(0, 2)]) {
        callback(new Error('地址编码错误'))
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
      step: 1,
      uid: '',
      uploadBtnDisableFront: false,
      uploadBtnDisableBack: false,
      fileListFront: [],
      fileListBack: [],
      sendCodeText: '发送验证码',
      telNumDisabled: false,
      sendCodeDisabled: true,
      ruleForm: {
        nickname: '',
        uphone: '',
        code: '',
        password: '',
        checkPass: '',
        name: '',
        idNumber: ''
      },
      imageUrl: null,
      rules: {
        nickname: [{ required: true, message: '请输入您的昵称', trigger: 'blur' }, { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }],
        uphone: [{ required: true, validator: validateTelNum }],
        code: [{ required: true, message: '请输入您的手机收到的验证码', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        name: [{ required: true, message: '请输入您的真实姓名', trigger: 'change' }],
        idNumber: [{ required: true, message: '请输入身份证号', trigger: 'change' }, { validator: IdentityCodeValid, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('http://47.95.214.71:8080/api/addCuser', qs.stringify(this.postForm), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            })
            .then(response => {
              console.log(response.data)
              if (response.data.statusCode === '200') {
                this.uid = response.data.data[0].uid
                this.step = 2
                this.$message({
                  message: '恭喜，注册成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message({
                  message: '这个手机号已经注册过了哦',
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
            message: '注册失败，好好检查一下吧',
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
        .post('http://47.95.214.71:8080/api/getCheckCode', qs.stringify({ uphone: this.ruleForm.uphone }), {
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
    },
    handleUploadChangeFront(file, fileList) {
      this.uploadBtnDisableFront = true
    },
    handleRemoveFileFront(file, fileList) {
      this.uploadBtnDisableFront = false
    },
    handleUploadChangeBack(file, fileList) {
      this.uploadBtnDisableBack = true
    },
    handleRemoveFileBack(file, fileList) {
      this.uploadBtnDisableBack = false
    },
    submitUpload() {
      this.$refs['upload-front'].submit()
      this.$refs['upload-back'].submit()
    },
    handleSuccess() {
      router.go(-1)
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
        nickname: this.ruleForm.nickname,
        uphone: this.ruleForm.uphone,
        code: this.ruleForm.code,
        password: this.ruleForm.password,
        name: this.ruleForm.name,
        idNumber: this.ruleForm.idNumber,
        profile: '我是萌新'
      }
    }
  }
}
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.signin {
  padding: 10px 12px 0 12px;

  .form {
    .btn-group {
      font-size: 0;

      .signin-btn {
        margin: 5px 0;
        width: 100%;
      }
    }

    .upload {
    }
  }
}
</style>
