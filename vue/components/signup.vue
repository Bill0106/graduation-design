<template>
  <el-card class="box-card">
    <el-form :model="form" :rules="rules" ref="signupForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="handleSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import services from '@/services'

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: {
          required: true,
          message: '请输入用户名'
        },
        email: {
          required: true,
          message: '请输入邮箱'
        },
        password: {
          required: true,
          message: '请输入密码'
        },
        confirmPassword: {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.form.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          }
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          const { username, email, password } = this.form
          services.signup({ username, email, password })
            .then(res => {
              const { data } = res
              if (data.status === 'success') {
                this.$router.push({ name: 'login' })
              }
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
