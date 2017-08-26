<template>
  <div>
    <el-button
      style="margin-bottom: 10px"
      @click="dialogVisible = true"
    >
      添加代码类型
    </el-button>
    <el-table :data="filteredList" v-loading.body="isFetching">
      <el-table-column prop="name" label="类型名称"></el-table-column>
      <el-table-column prop="platforms" label="类型名称"></el-table-column>
      <el-table-column label="类型名称">
        <template scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            :loading="isDeleting"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
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
            <el-option
              v-for="(item, index) in platforms"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible === false">取消</el-button>
        <el-button type="primary" :loading="isPosting" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import services from '@/services'

export default {
  name: 'adminCodeTypes',
  data() {
    return {
      codeTypes: [],
      total: 0,
      codeType: {
        name: '',
        platforms: []
      },
      platforms: [
        {
          label: '服务器端',
          value: 'SERVER'
        },
        {
          label: '浏览器端',
          value: 'BROWSER'
        },
        {
          label: '客户端',
          value: 'CLIENT'
        },
        {
          label: '移动端',
          value: 'MOBILE'
        }
      ],
      dialogVisible: false,
      isFetching: false,
      isPosting: false,
      isDeleting: false
    }
  },
  computed: {
    filteredList() {
      return this.codeTypes.map(item => {
        const platforms = item.platforms
          .map(platform => this.platforms.find(x => x.value === platform))
          .map(platform => platform.label)

        return {
          id: item._id,
          name: item.name,
          platforms: platforms.join('，')
        }
      })
    }
  },
  methods: {
    fetchList() {
      this.isFetching = true
      services.getCodeTypes()
        .then(res => {
          const { data } = res
          this.isFetching = false
          if (data.status === 'success') {
            this.codeTypes = data.data.list
            this.total = data.data.total
          }
        })
    },
    handleSubmit() {
      const { id, name, platforms } = this.codeType
      const service = id ? services.updateCodeType(id, { name, platforms }) : services.createCodeType({ name, platforms })

      this.isPosting = true
      service.then(res => {
        this.isPosting = false
        this.codeType = {
          name: '',
          platforms: []
        }
        this.fetchList()
      })
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
    handleDelete(id) {
      this.isDeleting = true
      services.deleteCodeType(id)
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
