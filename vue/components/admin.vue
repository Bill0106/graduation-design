<template>
  <div class="admin">
    <el-menu class="admin-menu" :default-active="$route.path" :router="true">
      <el-menu-item index="/admin/users">用户</el-menu-item>
      <el-menu-item index="/admin/user-groups">用户组</el-menu-item>
      <el-menu-item index="/admin/codes">代码内容</el-menu-item>
      <el-menu-item index="/admin/code-types">代码类型</el-menu-item>
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
