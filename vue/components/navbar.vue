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
            <el-dropdown-item v-if="user.role !== 'USER'" command="create">创建代码</el-dropdown-item>
            <el-dropdown-item v-if="user.role === 'ADMIN'" command="admin">管理后台</el-dropdown-item>
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
  data() {
    return {
      user: null
    }
  },
  methods: {
    async handleCommand(command) {
      switch (command) {
        case 'logout':
          await services.logout()
          Cookie.remove('token')
          location.reload()
          break
        case 'admin':
          this.$router.push({ name: 'admin' })
          break
        case 'create':
          this.$router.push({ name: 'codeCreate' })
          break
        default:
          break
      }
    }
  },
  async beforeMount() {
    const res = await services.checkUser()
    const { data } = res
    if (data.status === 'success') {
      this.user = data.data.user
    }
  }
}
</script>
