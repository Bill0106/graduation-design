<template>
  <div class="admin">
    <el-menu class="admin-menu">
      <el-menu-item index="1">用户</el-menu-item>
      <el-menu-item index="2">用户组</el-menu-item>
      <el-menu-item index="3">代码内容</el-menu-item>
      <el-menu-item index="4">代码类型</el-menu-item>
    </el-menu>
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin'
}
</script>
