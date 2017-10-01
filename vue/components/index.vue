<template>
  <el-card class="box-card full-width">
    <div class="index-list-search">
      <el-select v-model="codeType" size="small" placeholder="请选择代码类型" clearable @change="handleCodeTypeChange">
        <el-option
          v-for="(item, key) in codeTypes"
          :key="key"
          :value="item.name"
          :label="item.name"
        >
        </el-option>
      </el-select>
      <el-select v-model="platform" size="small" placeholder="请选择应用场景" clearable @change="handlePlatformChange">
        <el-option
          v-for="(item, key) in platforms"
          :key="key"
          :value="item.value"
          :label="item.label"
        >
        </el-option>
      </el-select>
    </div>
    <div class="index-list-item" v-for="(item, key) in filteredList" :key="key">
      <div class="index-list-item-content">
        <p>
          <span>{{item.username}}</span>
          <i>/</i>
          <span @click="handleCodeTitleClick(item)">{{item.title}}</span>
        </p>
        <div>
          <span>{{item.type}}</span>
          <i>·</i>
          <span>{{item.createdAt}}</span>
        </div>
      </div>
      <div class="index-list-item-comments">
        <i class="material-icons">mode_comment</i>
        <span>{{item.comments || 0}}</span>
      </div>
    </div>
    <div class="index-list-page">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="limit"
        :current-page="currentPage"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'
import services from '@/services'
import platforms from '@/constants/platforms'

export default {
  name: 'index',
  data() {
    return {
      codeList: [],
      total: 0,
      limit: 30,
      currentPage: 1,
      codeType: '',
      codeTypes: [],
      platform: '',
      platforms,
      isFetching: false
    }
  },
  computed: {
    filteredList() {
      return this.codeList.map(item => {
        return {
          id: item._id,
          title: item.title,
          username: item.userId.username,
          type: item.codeTypeId.name,
          createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
          comments: 0
        }
      })
    }
  },
  methods: {
    async fetchList() {
      this.isFetching = true

      const params = { limit: this.limit, page: this.currentPage }
      if (this.codeType) {
        params.codeType = this.codeType
      }
      if (this.platform) {
        params.platform = this.platform
      }

      const { data } = await services.getCodes(params)
      if (data.status === 'success') {
        this.codeList = data.data.list
        this.total = data.data.count
      }
      this.isFetching = false
    },
    handleCodeTypeChange(value) {
      this.codeType = value
      this.currentPage = 1
      this.fetchList()
    },
    handlePlatformChange(value) {
      this.platform = value
      this.currentPage = 1
      this.fetchList()
    },
    handlePageChange(page) {
      this.currentPage = page
      this.fetchList()
    },
    handleCodeTitleClick(code) {
      this.$router.push({ name: 'codeDetail', params: { id: code.id } })
    }
  },
  async beforeMount() {
    this.fetchList()

    const { data } = await services.getCodeTypes()
    if (data.status === 'success') {
      this.codeTypes = data.data.list
    }
  }
}
</script>
