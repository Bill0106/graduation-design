<template>
  <div>
    <el-table :data="filteredList" v-loading.body="isFetching">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role.roleName" label="用户组"></el-table-column>
      <el-table-column prop="createdAt" label="注册时间"></el-table-column>
      <el-table-column>
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleEditRole(scope.row)">编辑用户组</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="admin-pagination">
      <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
    </div>
    <el-dialog title="修改用户组" :visible.sync="dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="用户组">
          <el-select v-model="userRole">
            <el-option
              v-for="(item, key) in filteredUserRoles"
              :key="key"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="isSaving" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
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
      userId: '',
      userRoles: [],
      userRole: '',
      total: 0,
      current: 1,
      isFetching: false,
      isSaving: false,
      dialogVisible: false
    }
  },
  computed: {
    filteredList() {
      return this.users.map(item => {
        return {
          id: item._id,
          username: item.username,
          email: item.email,
          role: item.userRoleId,
          createdAt: moment(item.createdAt).format('YYYY-MM-DD')
        }
      })
    },
    filteredUserRoles() {
      return this.userRoles.map(item => {
        return {
          value: item._id,
          label: item.roleName
        }
      })
    }
  },
  methods: {
    async fetchUserList() {
      this.isFetching = true

      const users = await services.getUsers()
      const { data } = users
      if (data.status === 'success') {
        this.users = data.data.list
        this.total = data.data.total
      }
      this.isFetching = false
    },
    handleEditRole(item) {
      this.dialogVisible = true

      this.userRole = item.role._id
      this.userId = item.id
    },
    async handleSubmit() {
      this.isSaving = true

      const res = await services.changeUserRole(this.userId, this.userRole)
      const { data } = res
      if (data.status === 'success') {
        this.fetchUserList()
      }
      this.isSaving = false
      this.dialogVisible = false
    }
  },
  async beforeMount() {
    this.fetchUserList()

    const res = await services.getUserRoles()
    const { data } = res
    if (data.status === 'success') {
      this.userRoles = data.data.list
    }
  }
}
</script>
