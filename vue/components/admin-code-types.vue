<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="dialogVisible = true">添加代码类型</el-button>
    <el-table :data="filteredList" v-loading.body="isFetching">
      <el-table-column prop="name" label="类型名称"></el-table-column>
      <el-table-column prop="platforms" label="类型名称"></el-table-column>
      <el-table-column label="类型名称">
        <template scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" :loading="isDeleting" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加代码类型" :visible.sync="dialogVisible">
      <el-form label-width="80px" :model="codeType">
        <el-form-item label="类型名称">
          <el-input v-model="codeType.name"></el-input>
        </el-form-item>
        <el-form-item label="应用场景">
          <el-select v-model="codeType.platforms" multiple placeholder="请选择">
            <el-option v-for="(item, index) in platforms" :key="index" :label="item.label" :value="item.value"></el-option>
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
import platforms from '@/constants/platforms'
import services from '@/services'

export default {
  name: 'adminCodeTypes',
  data() {
    return {
      codeTypes: [],
      codeType: {
        name: '',
        platforms: []
      },
      dialogVisible: false,
      isFetching: false,
      isSaving: false,
      isDeleting: false,
      platforms
    }
  },
  computed: {
    filteredList() {
      return this.codeTypes.map(item => {
        const platforms = item.platforms.map(platform => this.platforms.find(x => x.value === platform)).map(platform => platform.label)

        return {
          id: item._id,
          name: item.name,
          platforms: platforms.join('，')
        }
      })
    }
  },
  methods: {
    async fetchList() {
      this.isFetching = true

      const { data } = await services.getCodeTypes()

      this.isFetching = false
      if (data.status === 'success') {
        this.codeTypes = data.data.list
      }
    },
    async handleSubmit() {
      try {
        const { id, name, platforms } = this.codeType

        this.isSaving = true
        if (id) {
          await services.updateCodeType(id, { name, platforms })
        } else {
          await services.createCodeType({ name, platforms })
        }

        this.codeType = { name: '', platforms: [] }
        this.dialogVisible = false
        this.isSaving = false

        this.fetchList()
      } catch (error) {
        this.$message.error(error.message)
        this.isSaving = false
      }
    },
    handleEdit(id) {
      const codeType = this.codeTypes.find(item => item._id === id)
      this.codeType = {
        name: codeType.name,
        platforms: codeType.platforms,
        id: codeType._id
      }
      this.dialogVisible = true
    },
    async handleDelete(id) {
      this.isDeleting = true
      await services.deleteCodeType(id)
      this.isDeleting = false
      this.fetchList()
    }
  },
  beforeMount() {
    this.fetchList()
  }
}
</script>
