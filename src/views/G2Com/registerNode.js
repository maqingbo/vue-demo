import G6 from '@antv/g6'

const ICON_MAP = {
  a: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ',
  b: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ'
}

G6.registerNode(
  'card-node',
  {
    drawShape: function drawShape (cfg, group) {
      const color = cfg.error ? '#F4664A' : '#30BF78'
      const r = 2
      const shape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 60,
          stroke: color,
          radius: r
        },
        name: 'main-box',
        draggable: true
      })

      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 20,
          fill: color,
          radius: [r, r, 0, 0]
        },
        name: 'title-box',
        draggable: true
      })

      // left icon
      group.addShape('image', {
        attrs: {
          x: 4,
          y: 2,
          height: 16,
          width: 16,
          cursor: 'pointer',
          img: ICON_MAP[cfg.nodeType || 'app']
        },
        name: 'node-icon'
      })

      // title text
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: 2,
          x: 24,
          lineHeight: 20,
          text: cfg.title,
          fill: '#fff'
        },
        name: 'title'
      })

      if (cfg.nodeLevel > 0) {
        group.addShape('marker', {
          attrs: {
            x: 184,
            y: 30,
            r: 6,
            cursor: 'pointer',
            symbol: cfg.collapse ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#666',
            lineWidth: 1
          },
          name: 'collapse-icon'
        })
      }
      return shape
    }
  },
  'single-node'
)

G6.registerNode('rect-jsx',
  (cfg) => `
    <group>
      <rect>
        <rect style={{
          width: 150,
          height: 20,
          fill: ${cfg.status === 1 ? '#45be85' : '#35495e'},
          radius: [6, 6, 0, 0],
          cursor: 'move',
          stroke: '#45be85'
        }} draggable="true">
          <text style={{
            marginTop: 2, 
            marginLeft: 75, 
            textAlign: 'center', 
            fontWeight: 'bold', 
            fill: '#fff' }}>{{label}}</text>
        </rect>
        <rect style={{
          width: 150,
          height: 55,
          stroke: ${cfg.color},
          fill: #ffffff,
          radius: [0, 0, 6, 6],
        }}>
          <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
          <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
        </rect>
      </rect>
    </group>`
)
