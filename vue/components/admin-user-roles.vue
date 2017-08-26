<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="dialogVisible = true">添加用户组</el-button>
    <el-table :data="userRoles" v-loading.body="isFetching">
      <el-table-column prop="role" label="用户组"></el-table-column>
      <el-table-column prop="roleName" label="名称"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row._id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            :loading="isDeleting"
            @click="handleDelete(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户组" :visible.sync="dialogVisible">
      <el-form label-width="80px" :model="userRole">
        <el-form-item label="用户组">
          <el-input v-model="userRole.role"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="userRole.roleName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible === false">取消</el-button>
        <el-button type="primary" :loading="isSaving" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import services from '@/services'

export default {
  name: 'adminUserRoles',
  data() {
    return {
      userRoles: [],
      userRole: {
        role: '',
        roleName: ''
      },
      isFetching: false,
      isSaving: false,
      isDeleting: false,
      dialogVisible: false
    }
  },
  methods: {
    fetchList() {
      this.isFetching = true
      services.getUserRoles()
        .then(res => {
          const { data } = res
          this.isFetching = false
          if (data.status === 'success') {
            this.userRoles = data.data.list
          }
        })
    },
    handleSubmit() {
      const { id, role, roleName } = this.userRole
      const service = id ? services.updateUserRole(id, { role, roleName }) : services.createUserRole({ role, roleName })

      this.isSaving = true
      service.then(res => {
        this.isSaving = false
        this.userRole = {
          name: '',
          platforms: []
        }
        this.dialogVisible = false
        this.fetchList()
      })
    },
    handleEdit(id) {
      const userRole = this.userRoles.find(item => item._id === id)
      this.userRole = {
        role: userRole.role,
        roleName: userRole.roleName,
        id: userRole._id
      }
      this.dialogVisible = true
    },
    handleDelete(id) {
      this.isDeleting = true
      services.deleteUserRole(id)
        .then(res => {
          this.isDeleting = false
          this.fetchList()
        })
    }
  },
  beforeMount() {
    this.fetchList()
  }
}
</script>
