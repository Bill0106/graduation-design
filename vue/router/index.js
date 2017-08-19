import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Signup from '@/components/signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
