<template>
  <div class="about-us">
    <headerPage title="关于我们">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="团队介绍" name="team" class="team-tab">
          <el-card class="describe">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem laborum earum quae officia natus et molestias delectus fugit labore dolores minus dolorum aut facere, ipsum accusantium quaerat iste excepturi quos!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem laborum earum quae officia natus et molestias delectus fugit labore dolores minus dolorum aut facere, ipsum accusantium quaerat iste excepturi quos!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem laborum earum quae officia natus et molestias delectus fugit labore dolores minus dolorum aut facere, ipsum accusantium quaerat iste excepturi quos!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem laborum earum quae officia natus et molestias delectus fugit labore dolores minus dolorum aut facere, ipsum accusantium quaerat iste excepturi quos!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem laborum earum quae officia natus et molestias delectus fugit labore dolores minus dolorum aut facere, ipsum accusantium quaerat iste excepturi quos!
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="成员" name="member" class="member-tab">
          <div class="card" v-for="(p, index) of member" :key="index">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="p.avatar" alt="" class="avatar">
              <div class="info">
                <div class="name">{{p.name}}</div>
                <div class="character">{{p.character}}</div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </headerPage>
  </div>
</template>

<script>
import router from '@/router'
import headerPage from 'components/HeaderPage'
export default {
  name: 'aboutUs',
  data() {
    return {
      activeName: 'team',
      member: [
        {
          name: '李耀恒',
          avatar: 'http://element.eleme.io/1.4/static/hamburger.50e4091.png',
          character: 'BOSS'
        }, {
          name: '白佳杰',
          avatar: 'http://element.eleme.io/1.4/static/hamburger.50e4091.png',
          character: '后端'
        }, {
          name: '梁胡斯乐',
          avatar: 'http://element.eleme.io/1.4/static/hamburger.50e4091.png',
          character: '后端'
        }, {
          name: '刘凯龙',
          avatar: 'http://element.eleme.io/1.4/static/hamburger.50e4091.png',
          character: '前端'
        }
      ]
    }
  },
  methods: {
    goBack() {
      router.go(-1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    headerPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.about-us
  top 0
  bottom 0
  background #ededed
  .tabs
    .el-tabs__header
      margin 0
      .el-tabs__nav
        width 100%
        background #fff
        .el-tabs__item
          width 50%
          text-align center
    .el-tabs__content
      .team-tab
        padding 0
        .describe
          margin 20px 10px
          font-size 14px
          line-height 20px
      .member-tab
        box-sizing border-box
        padding 10px
        height 100%
        .card
          margin-bottom 20px
          .avatar
            float left
            height 90px
          .info
            display inline-block
            float left
            padding 0 10px
            .name
              font-size 20px
              line-height 50px
            .character
              padding-left 3px
              color #475669
              font-size 14px
              font-weight 200
              line-height 20px
</style>