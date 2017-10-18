<template>
  <div class="service-form">
    <headerPage title="发布服务">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm">
        <el-form-item label="服务名称" prop="title">
          <el-input size="large" v-model="ruleForm.title" placeholder="一句话描述你出售的服务"></el-input>
        </el-form-item>
        <el-form-item label="服务类别" prop="trade">
          <el-select v-model="ruleForm.trade" placeholder="请选择" style="width:100%">
            <el-option value="家政"></el-option>
            <el-option value="教育"></el-option>
            <el-option value="互联网"></el-option>
            <el-option value="生活"></el-option>
            <el-option value="设计"></el-option>
            <el-option value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务详情" prop="odescribe">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model.trim.number="ruleForm.odescribe" placeholder="希望服务的目标人群 + 服务的范围点"></el-input>
        </el-form-item>
        <el-form-item label="我的位置" prop="address">
          <el-input size="large" v-model="ruleForm.address" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="出价（元）" prop="money">
          <el-input-number v-model="ruleForm.money" :min="0" :max="999" style="width:100%"></el-input-number>
        </el-form-item>
        <div class="btn-group">
          <el-button size="large" class="btn" type="primary" @click="submitForm('ruleForm')">发布</el-button>
          <br>
          <el-button size="large" class="btn" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </headerPage>
  </div>
</template>

<script>
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'serviceForm',
  data() {
    return {
      ruleForm: {
        title: '',
        odescribe: '',
        address: '',
        money: 0,
        trade: ''
      },
      rules: {
        title: [
          { required: true, message: '这里是必填项', trigger: 'blur' },
          { min: 3, message: '不能短于3个字符哦', trigger: 'blur' }
        ],
        odescribe: [
          { required: true, message: '请填写正确的信息', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写正确的位置', trigger: 'change' }
        ],
        trade: [
          { required: true, message: '这是必填项', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.postObj)
          this.$http.post(`http://localhost:8080/api/addCorder`, qs.stringify(this.postObj), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }).then((response) => {
            console.log(response.data)
            this.$notify({
              title: '成功',
              message: '您的服务已发布',
              type: 'success',
              duration: 1500
            })
            router.go(-1)
          }).catch((err) => {
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
    handleSelect(item) {
      console.log(item)
    }
  },
  components: {
    headerPage
  },
  computed: {
    uid() {
      return store.state.uID
    },
    postObj() {
      return {
        type: 's',
        trade: this.ruleForm.trade,
        title: this.ruleForm.title,
        money: this.ruleForm.money,
        odescribe: this.ruleForm.odescribe,
        address: this.ruleForm.address,
        ocount: 0,
        uid: this.uid
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.service-form {
  padding: 10px 12px 0 12px;

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
