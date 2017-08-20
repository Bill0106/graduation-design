<template>
  <nav class="navbar">
    <div class="container">
      <span class="navbar-brand" @click="$router.push({ name: 'index' })">代码共享</span>
      <div class="navbar-right" v-if="!user">
        <span class="navbar-right-btn" @click="$router.push({ name: 'login' })">登录</span>
        <i>|</i>
        <span class="navbar-right-btn" @click="$router.push({ name: 'signup' })">注册</span>
      </div>
      <div class="navbar-right" v-if="user">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.username}} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="create">创建代码</el-dropdown-item>
            <el-dropdown-item command="admin">管理后台</el-dropdown-item>
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import Cookie from 'js-cookie'
import services from '@/services'

export default {
  name: 'navbar',
  props: {
    user: Object
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          services.logout()
            .then(res => {
              Cookie.remove('token')
              location.reload()
            })
          break
        case 'admin':
          this.$router.push({ name: 'admin' })
          break
        default:
          break
      }
    }
  }
}
</script>
