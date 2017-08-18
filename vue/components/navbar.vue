<template>
  <nav class="navbar">
    <div class="container">
      <span class="navbar-brand">代码共享</span>
      <div class="navbar-right">
        <span class="navbar-right-btn" @click="$router.push({ name: 'login' })">登录</span>
        <i>|</i>
        <span class="navbar-right-btn">注册</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>
