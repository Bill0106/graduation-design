<template>
  <div class="login">
    <el-card class="login-box-card">
      <el-form>
        <el-form-item label="邮箱" :model="form">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" :model="form">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import services from '@/services'

export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      services.login(this.form)
        .then(res => console.log(res))
    }
  }
}
</script>
