<template>
  <div>
    <div id="container" class="wrap"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import * as mock from './mock'
// import check from './svg/check.svg'
import './registerNode.js'

export default {
  name: 'G2Com',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    this.init('container')
  },
  methods: {
    init (id) {
      const container = document.getElementById(id)
      const width = container.scrollWidth || 1500
      const height = container.scrollHeight || 360

      const tooltip = new G6.Tooltip({
        offsetX: 30 + 10,
        offsetY: 30 + 10,
        itemTypes: ['node', 'edge'],
        getContent: (e) => {
          const outDiv = document.createElement('div')
          outDiv.style.width = 'fit-content'
          // outDiv.style.padding = '0px 0px 20px 0px'
          outDiv.innerHTML = `
          <h4>Custom Content</h4>
          <ul>
            <li>Type: ${e.item.getType()}</li>
          </ul>
          <ul>
            <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
          </ul>`
          return outDiv
        }
      })

      const graph = new G6.Graph({
        container: id,
        width,
        height,
        fitView: true,
        plugins: [tooltip],
        modes: {
          default: ['drag-canvas', 'drag-node']
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          // align: 'UL',
          controlPoints: true,
          nodesepFunc: () => 1,
          ranksepFunc: () => 1
        },
        defaultNode: {
          type: 'modelRect',
          size: [160, 40],
          style: {
            cursor: 'pointer'
          }
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            lineWidth: 2,
            lineAppendWidth: 10,
            radius: 10,
            offset: 30,
            endArrow: true,
            cursor: 'pointer'
          }
        },
        nodeStateStyles: {
          hover: {
            lineWidth: 2,
            stroke: '#1890ff',
            fill: '#e6f7ff'
          }
        }
      })

      graph.data(mock.data)
      graph.render()

      graph.on('node:mouseenter', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'hover', true)
      })
      graph.on('node:mouseleave', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'hover', false)
      })
      graph.on('edge:mouseenter', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'active', true)
      })
      graph.on('edge:mouseleave', (evt) => {
        const { item } = evt
        graph.setItemState(item, 'active', false)
      })
      graph.on('edge:click', (evt) => {
        const { item } = evt
        // graph.setItemState(item, 'selected', true)
        const source = item._cfg.sourceNode._cfg.id
        const target = item._cfg.targetNode._cfg.id
        console.log(`source -> target:`, source, target)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.wrap {
  // background-color: #fdeec6;
  border: 3px solid #555;
  display: inline-block;
}
</style>
