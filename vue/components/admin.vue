<template>
  <div class="admin">
    <el-menu class="admin-menu" :default-active="$route.path" :router="true">
      <el-menu-item index="/admin/users">用户</el-menu-item>
      <el-menu-item index="/admin/user-roles">用户组</el-menu-item>
      <el-menu-item index="/admin/codes">代码内容</el-menu-item>
      <el-menu-item index="/admin/code-types">代码类型</el-menu-item>
      <el-menu-item index="/">返回首页</el-menu-item>
    </el-menu>
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import services from '@/services'

export default {
  name: 'admin',
  async beforeRouteEnter(to, from, next) {
    const { data } = await services.checkUser()

    if (data.status === 'success') {
      const { user } = data.data
      if (user.permissions.includes('ADMIN_DASHBOARD')) {
        next()
      } else {
        window.location = '/'
      }
    } else {
      window.location = '/login'
    }
  }
}
</script>
