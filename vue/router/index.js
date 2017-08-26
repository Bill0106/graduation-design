import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Signup from '@/components/signup'
import CodeForm from '@/components/code-form'
import Admin from '@/components/admin'
import AdminUsers from '@/components/admin-users'
import AdminUserRoles from '@/components/admin-user-roles'
import AdminCodeTypes from '@/components/admin-code-types'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/create',
      name: 'codeCreate',
      component: CodeForm
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: { name: 'adminUsers' },
      children: [
        {
          path: 'users',
          name: 'adminUsers',
          component: AdminUsers
        },
        {
          path: 'user-roles',
          name: 'adminUserRoles',
          component: AdminUserRoles
        },
        {
          path: 'code-types',
          name: 'adminCodeTypes',
          component: AdminCodeTypes
        }
      ]
    }
  ]
})
