<template>
  <div class="home">
    <el-row class="wrap">
      <el-col :span="11">
        <el-input v-model="text" type="textarea" :autosize="{ minRows: 24, maxRows: 24}"></el-input>
      </el-col>
      <el-col :span="2" style="text-align:center;">
        <el-button type="primary" @click="parse">转换</el-button>
      </el-col>
      <el-col :span="11">
        <!-- <el-input v-model="text2" type="textarea" :autosize="{ minRows: 10, maxRows: 10}"></el-input> -->
        <span>{{ text2 }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Papa from 'papaparse'

export default {
  name: 'Home',
  data () {
    return {
      text: '',
      text2: ''
    }
  },
  components: {},
  methods: {
    parse () {
      this.text2 = Papa.parse(this.text)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
}
</style>
