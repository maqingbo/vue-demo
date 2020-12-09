<template>
  <div>
    <el-button type="primary" size="small" @click="scroll">滚动</el-button>
    <div class="box">
      <div v-for="(v, i) in 100" :key="i" class="wrap">
        <div :id="`id_${v}`">{{ v }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const scrollToElement = require('scroll-to-element')

export default {
  name: 'ScrollTo',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    scroll () {
      scrollToElement('#id_80', {
        offset: 0,
        duration: 400
      })
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  max-height: 200px;
  overflow: auto;
  border: 1px solid #ccc;
}
.wrap {
  > div {
    height: 40px;
    line-height: 40px;
    &:nth-child(2n) {
      background-color: pink;
    }
  }
}
</style>
