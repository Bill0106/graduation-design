<template>
  <el-card class="box-card full-width">
    <el-form :model="code" label-width="80px">
      <el-form-item label="代码类型">
        <el-select v-model="code.codeType">
          <el-option v-for="(item, index) in codeTypes" :key="index" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用场景">
        <el-checkbox-group v-model="code.platforms">
          <el-checkbox v-for="(item, index) in platforms" :label="item.value" :key="index">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
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
import services from '@/services'

export default {
  name: 'codeForm',
  data() {
    return {
      codeTypes: [],
      code: {
        title: '',
        code: '',
        codeType: '',
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
      ]
    }
  },
  beforeMount() {
    services.getCodeTypes()
      .then(res => {
        const { data } = res
        if (data.status === 'success') {
          this.codeTypes = data.data.list
        }
      })
  }
}
</script>
