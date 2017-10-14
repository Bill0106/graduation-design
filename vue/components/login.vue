<template>
  <el-card class="box-card">
    <el-form :model="form">
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" :loading="isLogin" @click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import Cookie from 'js-cookie'
import services from '@/services'

export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      isLogin: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLogin = true
        const { data } = await services.login(this.form)
        if (data.status === 'success') {
          Cookie.set('token', data.data.token, { expires: 7 })
          window.location = '/'
        }
        this.isLogin = false
      } catch (error) {
        this.isLogin = false
        this.$message.error(error.message)
      }
    }
  },
  beforeMount() {
    if (Cookie.get('token')) {
      Cookie.remove('token')
      location.reload()
    }
  }
}
</script>
