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
    <div class="index-list-item" v-for="(item, key) in codeList" :key="key">
      <div class="index-list-item-content">
        <p>
          <span>{{item.user}}</span>
          <i>/</i>
          <span>{{item.title}}</span>
        </p>
        <div>
          <span>{{item.type}}</span>
          <i>·</i>
          <span>{{item.createdAt}}</span>
        </div>
      </div>
      <div class="index-list-item-comments">
        <i class="material-icons">mode_comment</i>
        <span>{{item.comments}}</span>
      </div>
    </div>
    <div class="index-list-page">
      <el-pagination layout="prev, pager, next" :total="4"></el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      codeList: [
        {
          title: 'fuck-you-world',
          user: 'bill_lord',
          type: 'JavaScript',
          comments: 100,
          createdAt: '2017-09-02'
        },
        {
          title: 'kill-those-lovers',
          user: 'bill_lord',
          type: 'JavaScript',
          comments: 50,
          createdAt: '2017-09-02'
        },
        {
          title: 'fire-fire-fire',
          user: 'bill_lord',
          type: 'JavaScript',
          comments: 3,
          createdAt: '2017-09-02'
        },
        {
          title: 'god-damn-idiot',
          user: 'bill_lord',
          type: 'JavaScript',
          comments: 32,
          createdAt: '2017-09-02'
        }
      ],
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
      ]
    }
  },
  methods: {
    handleCodeTypeChange(value) {
      console.log(value)
    },
    handlePlatformChange(value) {
      console.log(value)
    }
  }
}
</script>
