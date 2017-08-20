<template>
  <div class="admin">
    <el-menu class="admin-menu" :default-active="$route.name">
      <el-menu-item index="adminUsers">用户</el-menu-item>
      <el-menu-item index="adminUserRoles">用户组</el-menu-item>
      <el-menu-item index="adminCodes">代码内容</el-menu-item>
      <el-menu-item index="adminCodeTypes">代码类型</el-menu-item>
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
