<template>
  <div class="the-job-blood-container">
    <svg id="bloodChart" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>
</template>

<script>
// import Fetch from '@/api/index'
// import { JOB_TYPE, JOB_STATE } from '@/util/common.js'

// const fetch = new Fetch()
// const taskDevelopApi = fetch.apis.taskDevelop

import { NodeGraph } from './dag.js'
import * as mock from './mock'

export default {
  name: 'jobBlood',
  props: ['currentJob'],
  data () {
    return {
      dagData: {}
    }
  },
  computed: {},
  watch: {
    // dagData: {
    //   handler () {
    //     this.svgInit()
    //   },
    //   deep: true
    // }
  },
  created () { },
  mounted () {
    this.dagData = mock.data
    this.svgInit()
  },
  methods: {
    // 获取依赖
    async fetJobDependency () {
      // ...
    },
    // 绘制svg
    svgInit () {
      const svgDom = document.getElementById('bloodChart')
      svgDom.innerHTML = ''
      if (svgDom) {
        const graph = new NodeGraph(svgDom)
        graph.setNodes(this.dagData)
        graph.drawSvg()
      }
    }
  }
}
</script>

<style lang="less">
.the-job-blood-container {
  text-align: left;
  height: 100%;
  width: 100%;
  svg {
    min-height: 100%;
    min-width: 100%;
    overflow: auto;
  }
}
</style>
