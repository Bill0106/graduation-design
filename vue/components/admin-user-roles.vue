<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="dialogVisible = true">添加用户组</el-button>
    <el-table :data="filteredList" v-loading.body="isFetching">
      <el-table-column prop="role" label="用户组"></el-table-column>
      <el-table-column prop="roleName" label="名称"></el-table-column>
      <el-table-column prop="permissions" label="权限"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row._id)">
            编辑
          </el-button>
          <el-button type="danger" size="small" :loading="isDeleting" @click="handleDelete(scope.row._id)">
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
        <el-form-item label="权限">
          <el-checkbox-group v-model="userRole.permissionCodes">
            <el-checkbox v-for="(item, index) in permissionCodes" :key="index" :label="item.value">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
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
import permissionCodes from '@/constants/permission-codes'
import services from '@/services'

export default {
  name: 'adminUserRoles',
  data() {
    return {
      userRoles: [],
      userRole: {
        role: '',
        roleName: '',
        permissionCodes: []
      },
      isFetching: false,
      isSaving: false,
      isDeleting: false,
      dialogVisible: false,
      permissionCodes
    }
  },
  computed: {
    filteredList() {
      return this.userRoles.map(item => {
        const permissions = item.permissionCodes
          .map(i => permissionCodes.find(x => x.value === i))
          .filter(i => i)
          .map(i => i.label)
          .join('，')

        return {
          _id: item._id,
          role: item.role,
          roleName: item.roleName,
          permissions
        }
      })
    }
  },
  methods: {
    async fetchList() {
      this.isFetching = true
      const { data } = await services.getUserRoles()

      if (data.status === 'success') {
        this.userRoles = data.data.list
      }
      this.isFetching = false
    },
    async handleSubmit() {
      const { id, role, roleName, permissionCodes } = this.userRole

      this.isSaving = true
      if (id) {
        await services.updateUserRole(id, { role, roleName, permissionCodes })
      } else {
        await services.createUserRole({ role, roleName, permissionCodes })
      }

      this.userRole = { name: '', platforms: [] }
      this.dialogVisible = false
      this.isSaving = false
      this.fetchList()
    },
    handleEdit(id) {
      const userRole = this.userRoles.find(item => item._id === id)
      this.userRole = {
        role: userRole.role,
        roleName: userRole.roleName,
        id: userRole._id,
        permissionCodes: userRole.permissionCodes || []
      }
      this.dialogVisible = true
    },
    async handleDelete(id) {
      this.isDeleting = true
      await services.deleteUserRole(id)
      this.isDeleting = false
      this.fetchList()
    }
  },
  beforeMount() {
    this.fetchList()
  }
}
</script>
