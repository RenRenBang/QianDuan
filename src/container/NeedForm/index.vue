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
          <el-autocomplete size="large" v-model="ruleForm.position" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect" style="width:100%"></el-autocomplete>
        </el-form-item>
        <el-form-item label="赏金（元／人）" prop="money">
          <el-input-number v-model="ruleForm.money" @change="handleChange" :min="1" :max="999" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="人数要求" prop="peopleNum">
          <el-input-number v-model="ruleForm.peopleNum" @change="handleChange" :min="1" :max="100" style="width:100%"></el-input-number>
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
        peopleNum: 1
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
            message: '您的需求已发布',
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
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul caf', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店', 'address': '剑河路443-1' },
        { 'value': '北京饺子', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A1' }
      ]
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  components: {
    headerPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.need-form
  padding 70px 12px 0 12px
  .form
    .btn-group
      font-size 0
      .btn
        margin 5px 0
        width 100%
</style>
