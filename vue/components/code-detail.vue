<template>
  <div class="code-detail">
    <el-card class="box-card full-width" v-loading.body="isCodeFetching">
      <div class="code-detail-title">
        <span>{{username}}</span>
        <i>/</i>
        <p>{{code.title}}</p>
      </div>
      <pre class="code-detail-content" v-hightlight="code.code">
        <code :class="codeType"></code>
      </pre>
      <div class="code-detail-time">创建于 {{createAt}}</div>
    </el-card>
    <el-card v-for="item in filteredComments" class="box-card full-width" :key="item._id">
      <div class="code-comment-title">
        <span>{{item.userId.username}}</span>
        <i>·</i>
        <p>评论于 {{item.createdAt}}</p>
      </div>
      <div class="code-comment-content">
        <p v-for="(p, key) in item.content" :key="key">{{p}}</p>
      </div>
    </el-card>
    <el-card class="box-card full-width">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入评论内容"
        v-model="comment"
      >
      </el-input>
      <div class="code-comment-submit">
        <el-button type="primary" @click="handleCommitSubmit">提交评论</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import moment from 'moment'
import services from '@/services'

export default {
  name: 'codeDetail',
  data() {
    return {
      code: {},
      comments: [],
      comment: '',
      currentPage: 1,
      limit: 10,
      isCodeFetching: false,
      isCommentsFetching: false,
      isSaving: false
    }
  },
  computed: {
    username() {
      const { userId } = this.code
      return userId ? userId.username : ''
    },
    codeType() {
      const { codeTypeId } = this.code
      return codeTypeId ? codeTypeId.name.toLowerCase() : ''
    },
    createAt() {
      const { createdAt } = this.code
      return createdAt ? moment(createdAt).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    filteredComments() {
      return this.comments.map(item => {
        return Object.assign({}, item, {
          content: item.content.split(/\r?\n/).map(i => i.trim()),
          createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
      })
    }
  },
  directives: {
    hightlight: {
      bind: function(el, binding) {
        const codeElement = el.querySelector('code')
        if (binding.value) {
          codeElement.textContent = binding.value
          hljs.highlightBlock(codeElement)
        }
      },
      componentUpdated: function(el, binding) {
        const codeElement = el.querySelector('code')
        if (binding.value) {
          codeElement.textContent = binding.value
          hljs.highlightBlock(codeElement)
        }
      }
    }
  },
  methods: {
    async fetchComments() {
      this.isCommentsFetching = true
      const { data } = await services.getComments({
        limit: this.limit,
        page: this.currentPage,
        codeId: this.code._id
      })

      if (data.status === 'success') {
        this.comments = data.data.list
      }
      this.isCommentsFetching = false
    },
    async handleCommitSubmit() {
      try {
        this.isSaving = true
        await services.createComment({ content: this.comment, codeId: this.code._id })
        this.isSaving = false
        this.fetchComments()
      } catch (error) {
        this.isSaving = false
        this.$message.error(error.message)
      }
    }
  },
  async beforeMount() {
    this.isCodeFetching = true
    const { id } = this.$route.params
    const { data } = await services.getCode(id)

    if (data.status === 'success') {
      this.code = data.data
      this.fetchComments()
    }
    this.isCodeFetching = false
  }
}
</script>
