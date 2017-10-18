<template>
  <div class="need-form">
    <headerPage title="发布需求">
      <el-form :model="ruleForm" class="form" label-position="top" :rules="rules" ref="ruleForm">
        <el-form-item label="需求名称" prop="needName">
          <el-input size="large" v-model="ruleForm.needName" placeholder="我需要别人帮我做什么"></el-input>
        </el-form-item>
        <el-form-item label="需求详情" prop="needDetail">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model.trim.number="ruleForm.needDetail" placeholder="描述一下具体的求助内容，及需要获得的帮助。越清晰的描述，越容易获得帮助。"></el-input>
        </el-form-item>
        <el-form-item label="我的位置" prop="position">
          <el-autocomplete size="large" v-model="ruleForm.position" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" :trigger-on-focus="false" style="width:100%"></el-autocomplete>
        </el-form-item>
        <el-form-item label="赏金（元／人）" prop="money">
          <el-input-number v-model="ruleForm.money" :min="1" :max="999" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="人数要求" prop="peopleNum">
          <el-input-number v-model="ruleForm.peopleNum" :min="1" :max="100" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker v-model="ruleForm.deadline" type="date" placeholder="选择日期" :picker-options="pickerOptions" @focus="clearFocus()" style="width:100%">
          </el-date-picker>
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
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'needForm',
  data() {
    return {
      ruleForm: {
        needName: '',
        needDetail: '',
        position: '',
        money: 1,
        peopleNum: 1,
        deadline: null
      },
      rules: {
        needName: [
          { required: true, message: '这里是必填项', trigger: 'blur' },
          { min: 3, message: '不能短于3个字符哦', trigger: 'blur' }
        ],
        needDetail: [
          { required: true, message: '这里是必填项', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请填写正确的位置', trigger: 'change' }
        ],
        deadline: [
          { required: true, message: '这里是必填项', trigger: 'change', type: 'date' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
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
            message: '您的需求已发布',
            type: 'success',
            duration: 1500
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
    querySearchAsync(queryString, cb) {
      this.$http.get(`http://api.map.baidu.com/place/v2/suggestion?query=${this.ruleForm.position}&region=全国&city_limit=false&output=json&ak=OpxsVo8ACd3S0YCOL64hSOjY2cLjYCWG`).then((response) => {
        this.suggestion = response.data
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(this.suggestion)
        }, 3000 * Math.random())
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSelect(item) {
      console.log(item)
    },
    clearFocus() {
      document.activeElement.blur()
    }
  },
  components: {
    headerPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.need-form {
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

  .el-picker-panel {
    .el-date-picker {
      width: 100%;
    }
  }
}
</style>
