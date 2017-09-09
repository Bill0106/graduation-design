<template>
  <el-card class="box-card full-width">
    <div class="index-list-search">
      <el-select v-model="codeType" size="small" placeholder="请选择代码类型" @change="handleCodeTypeChange">
        <el-option
          v-for="(item, key) in codeTypes"
          :key="key"
          :value="item.value"
          :label="item.label"
        >
        </el-option>
      </el-select>
      <el-select v-model="platform" size="small" placeholder="请选择应用场景" @change="handlePlatformChange">
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
      <el-pagination layout="prev, pager, next" :total="4"></el-pagination>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'
import services from '@/services'

export default {
  name: 'index',
  data() {
    return {
      codeList: [],
      total: 0,
      codeType: '',
      codeTypes: [
        {
          label: 'JavaScript',
          value: 'JavaScript'
        },
        {
          label: 'PHP',
          value: 'PHP'
        },
        {
          label: 'Java',
          value: 'Java'
        },
        {
          label: 'C#',
          value: 'C#'
        }
      ],
      platform: '',
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

      const res = await services.getCodes({ limit: 30, page: 1 })
      const { data } = res

      this.isFetching = false
      if (data.status === 'success') {
        this.codeList = data.data.list
        this.total = data.data.total
      }
    },
    handleCodeTypeChange(value) {
      console.log(value)
    },
    handlePlatformChange(value) {
      console.log(value)
    },
    handleCodeTitleClick(code) {
      this.$router.push({ name: 'codeDetail', params: { id: code.id } })
    }
  },
  beforeMount() {
    this.fetchList()
  }
}
</script>
