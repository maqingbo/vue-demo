<template>
  <div>
    <div id="container" class="wrap"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import * as mock from './mock'

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

      const graph = new G6.Graph({
        container: id,
        width,
        height,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'drag-node']
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'UL',
          controlPoints: true,
          nodesepFunc: () => 1,
          ranksepFunc: () => 1
        },
        defaultNode: {
          type: 'modelRect',
          size: [270, 80],
          style: {
            radius: 5,
            stroke: '#69c0ff',
            fill: '#ffffff',
            lineWidth: 1,
            fillOpacity: 1
          },
          // label configurations
          labelCfg: {
            style: {
              fill: '#595959',
              fontSize: 14
            },
            offset: 30
          },
          // left rect
          preRect: {
            show: true,
            width: 4,
            fill: '#40a9ff',
            radius: 2
          },
          // configurations for the four linkpoints
          linkPoints: {
            top: false,
            right: false,
            bottom: false,
            left: false,
            // the size of the linkpoints' circle
            size: 10,
            lineWidth: 1,
            fill: '#72CC4A',
            stroke: '#72CC4A'
          },
          // configurations for state icon
          stateIcon: {
            // whether to show the icon
            show: true,
            x: 0,
            y: 0,
            // the image url for the icon, string type
            img:
              'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
            width: 16,
            height: 16,
            // adjust hte offset along x-axis for the icon
            offset: -5
          }
        },
        defaultEdge: {
          type: 'polyline',
          /* configure the bending radius and min distance to the end nodes */
          style: {
            lineWidth: 2,
            radius: 10,
            offset: 30,
            endArrow: true
            // stroke: '#F6BD16'
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
