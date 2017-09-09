<template>
  <div class="code-detail">
    <el-card class="box-card full-width">
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
    <el-card class="box-card full-width">
      <div class="code-comment-title">
        <span>user</span>
        <i>·</i>
        <p>评论于 2017-12-01 10:00:00</p>
      </div>
      <div class="code-comment-content">
        <p>太棒了这段代码，谢谢楼主</p>
        <p>太棒了这段代码，谢谢楼主</p>
      </div>
    </el-card>
    <el-card class="box-card full-width">
      <div class="code-comment-title">
        <span>user</span>
        <i>·</i>
        <p>评论于 2017-12-01 10:00:00</p>
      </div>
      <div class="code-comment-content">
        <p>太棒了这段代码，谢谢楼主</p>
        <p>太棒了这段代码，谢谢楼主</p>
      </div>
    </el-card>
    <el-card class="box-card full-width">
      <div class="code-comment-title">
        <span>user</span>
        <i>·</i>
        <p>评论于 2017-12-01 10:00:00</p>
      </div>
      <div class="code-comment-content">
        <p>太棒了这段代码，谢谢楼主</p>
        <p>太棒了这段代码，谢谢楼主</p>
      </div>
    </el-card>
    <el-card class="box-card full-width">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入评论内容"
        v-model="comment">
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
      comment: '',
      isFetching: false
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
    handleCommitSubmit() {
      console.log(this.comment)
    }
  },
  async beforeMount() {
    this.isFetching = true
    const { id } = this.$route.params
    const res = await services.getCode(id)
    const { data } = res

    this.isFetching = false
    if (data.status === 'success') {
      this.code = data.data
    }
  }
}
</script>
