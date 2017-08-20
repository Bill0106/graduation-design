<template>
  <el-card class="box-card full-width">
    <el-form :model="code">
      <el-form-item label="标题">
        <el-input v-model="code.title"></el-input>
      </el-form-item>
      <el-form-item label="代码内容">
        <el-input type="textarea" v-model="code.code" :autosize="{ minRows: 5 }"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button @click="$router.push({ name: 'index' })">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'codeForm',
  data() {
    return {
      code: {
        title: '',
        code: ''
      }
    }
  }
}
</script>
