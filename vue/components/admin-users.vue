<template>
  <div>
    <el-table :data="filteredList">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role" label="用户组"></el-table-column>
      <el-table-column prop="createdAt" label="注册时间"></el-table-column>
      <el-table-column>
        <template scope="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="admin-pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import services from '@/services'

export default {
  name: 'adminUsers',
  data() {
    return {
      users: [],
      total: 0,
      current: 1
    }
  },
  computed: {
    filteredList() {
      return this.users.map(item => {
        return {
          id: item._id,
          username: item.username,
          email: item.email,
          role: item.userRoleId.roleName,
          createdAt: moment(item.createdAt).format('YYYY-MM-DD')
        }
      })
    }
  },
  beforeMount() {
    services.getUsers()
      .then(res => {
        const { data } = res
        if (data.status === 'success') {
          this.users = data.data.list
          this.total = data.data.total
        }
      })
  }
}
</script>
