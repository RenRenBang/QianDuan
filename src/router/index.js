import Vue from 'vue'
import Router from 'vue-router'
import home from 'container/Home'
import login from 'container/Login'
import signin from 'container/SignIn'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    }
  ]
})
