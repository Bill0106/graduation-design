<template>
  <div>
    <el-table :data="codes">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="codeTypeId.name" label="类型"></el-table-column>
      <el-table-column prop="userId.username" label="用户名"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleDetailClick(scope.row._id)">查看详情</el-button>
          <el-button type="danger" size="small" :loading="isDeleting" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="admin-pagination">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="limit"></el-pagination>
    </div>
  </div>
</template>

<script>
import services from '@/services'

export default {
  name: 'adminCodes',
  data() {
    return {
      codes: [],
      total: 0,
      limit: 30,
      page: 1,
      isFetching: false,
      isDeleting: false
    }
  },
  methods: {
    async fetchList() {
      this.isFetching = true
      const { data } = await services.getCodes({ limit: this.limit, page: this.page })

      if (data.status === 'success') {
        this.codes = data.data.list
        this.total = data.data.count
      }
      this.isFetching = false
    },
    handleDetailClick(id) {
      this.$router.push({ name: 'codeDetail', params: { id } })
    },
    handleDelete(id) {}
  },
  beforeMount() {
    this.fetchList()
  }
}
</script>
