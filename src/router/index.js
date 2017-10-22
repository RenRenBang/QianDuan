import Vue from 'vue'
import Router from 'vue-router'

import home from 'container/Home'
import list from 'container/Home/List'
import me from 'container/Home/Me'

import login from 'container/Login'
import signin from 'container/SignIn'
import forgetPassword from 'container/ForgetPassword'
import needForm from 'container/NeedForm'
import serviceForm from 'container/ServiceForm'
import editUserInfo from 'container/EditUserInfo'
import collection from 'container/Collection'
import buyOrder from 'container/BuyOrder'
import sellOrder from 'container/SellOrder'
import serviceDetail from 'container/ServiceDetail'
import needDetail from 'container/NeedDetail'
import aboutUs from 'container/AboutUs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'list',
          name: 'list',
          component: list
        },
        {
          path: 'me',
          name: 'me',
          component: me
        }
      ]
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
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/needForm',
      name: 'needForm',
      component: needForm
    },
    {
      path: '/serviceForm',
      name: 'serviceForm',
      component: serviceForm
    },
    {
      path: '/editUserInfo',
      name: 'editUserInfo',
      component: editUserInfo
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/buyOrder',
      name: 'buyOrder',
      component: buyOrder
    },
    {
      path: '/sellOrder',
      name: 'sellOrder',
      component: sellOrder
    },
    {
      path: '/serviceDetail/:id',
      name: 'serviceDetail',
      component: serviceDetail
    },
    {
      path: '/needDetail/:id',
      name: 'needDetail',
      component: needDetail
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    }
  ]
})
