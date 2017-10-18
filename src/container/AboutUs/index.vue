<template>
  <div class="about-us">
    <headerPage title="关于我们">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="团队介绍" name="team" class="team-tab">
          <el-card class="describe">
            <p>YOUNG科技是一支成立于2016年5月的年轻团队，队员来自内蒙古财经大学计算机学院的不同专业。经过1年多的发展，团队不断吸收新鲜血液，夯实基础，发展创新，队员技术扎实，经验丰富，具有众多项目的实践经历，均取得不错的成果。现主要从事网站前后端开发，移动应用开发，UI设计等领域。我们致力于开发真正为用户解决问题的软件，服务社会，造福社会，努力成为一支合格的，优秀的技术团队。</p>
            <p>人人帮是一个非标准化的服务买卖平台，而不是售卖标准化的商品。作为专业技能分享经济平台，人人帮将聚集专业技能人才和机构。更专业地满足个人或者企业的服务需求。</p>
            <p>人人帮不仅是一个在线市场，同时也是一个孵化器。人人帮将会吸引人和机构在平台创业，用户将从中受益实现就业，企业将从该平台孵化出来与传统电商标准产品售卖不同，人人帮通过大数据应用将专业技能人才与全国各地的复杂服务需求匹配在一起，使其足不出户即可以服务需求，更实现了商业价值和社会价值的统一。</p>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="成员" name="member" class="member-tab">
          <div class="card" v-for="(p, index) of member" :key="index">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="p.avatar" alt="" class="avatar">
              <div class="info">
                <div class="name">{{p.name}}</div>
                <!-- <div class="character">{{p.character}}</div> -->
                <div class="motto">{{p.motto}}</div>
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
          avatar: 'static/img/LYH.jpeg',
          character: 'BOSS',
          motto: '挥舞着键盘敲出我的世界'
        }, {
          name: '白佳杰',
          avatar: 'static/img/BJJ.png',
          character: '后端',
          motto: '面朝大海，春暖花开'
        }, {
          name: '梁胡斯乐',
          avatar: 'static/img/LHSL.png',
          character: '后端',
          motto: 'php是世界上最牛逼的语言'
        }, {
          name: '刘凯龙',
          avatar: 'static/img/LKL.png',
          character: '前端',
          motto: 'Write Less, Do More'
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
.about-us {
  top: 0;
  bottom: 0;
  background: #ededed;

  .tabs {
    .el-tabs__header {
      margin: 0;

      .el-tabs__nav {
        width: 100%;
        background: #fff;

        .el-tabs__item {
          width: 50%;
          text-align: center;
        }
      }
    }

    .el-tabs__content {
      .team-tab {
        padding: 0;

        .describe {
          margin: 20px 10px;
          font-size: 16px;
          text-indent: 2em;
          font-weight: 200;
          line-height: 25px;
          text-align: justify;
        }
      }

      .member-tab {
        box-sizing: border-box;
        padding: 10px;
        height: 100%;

        .card {
          margin-bottom: 20px;

          .avatar {
            float: left;
            height: 90px;
          }

          .info {
            display: inline-block;
            float: left;
            padding: 0 10px;

            .name {
              font-size: 20px;
              line-height: 50px;
            }

            .motto {
              padding-left: 3px;
              color: #475669;
              font-size: 14px;
              font-weight: 200;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>