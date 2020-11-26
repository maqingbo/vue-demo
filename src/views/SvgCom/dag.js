// dag.js
const SVG_NS = 'http://www.w3.org/2000/svg'
export const getTextWidth = text => {
  const svg = document.createElementNS(SVG_NS, 'svg')
  const oText = document.createElementNS(SVG_NS, 'text')
  oText.innerHTML = text
  svg.appendChild(oText)
  document.body.appendChild(svg)
  const width = oText.getBBox().width
  document.body.removeChild(svg)
  return width + 10
}

// 创建tag标签
export const createTag = (tag, attrObjs) => {
  const tagEle = document.createElementNS(SVG_NS, tag)
  for (const key in attrObjs) {
    tagEle.setAttribute(key, attrObjs[key])
  }
  return tagEle
}

// node类
class DagNode {
  constructor (job = {}, options = {}, containerId) {
    this.prev = []
    this.next = []
    this.job = job
    this.width = Math.max(getTextWidth(job.jobName || job.jobId), 100)
    this.height = 40
    this.offsetX = options.offsetX || 0
    this.offsetY = options.offsetY || 0
    this.containerId = containerId || 'bloodChart'
  }

  // 绘制node
  drawNode () {
    const oG = createTag('g')
    const oRect = createTag('rect', {
      x: this.offsetX,
      y: this.offsetY,
      rx: 5,
      ry: 5,
      width: this.width,
      height: this.height,
      style: 'cursor: pointer; fill: transparent; stroke-width: 2; stroke: #303030'
    })
    const oText = createTag('text', {
      x: this.offsetX + 10,
      y: this.offsetY + 15,
      style: `cursor: pointer; fill: #303030`,
      'data-node': JSON.stringify(this.job)
    })

    const tSpan = createTag('tspan', {
      x: this.offsetX + 10,
      y: this.offsetY + 15,
      style: `cursor: pointer; fill: #303030`,
      'data-node': JSON.stringify(this.job)
    })
    tSpan.innerHTML = `${this.job.jobName || this.job.jobId}`

    const tSpan2 = createTag('tspan', {
      x: this.offsetX + 10,
      y: this.offsetY + 35,
      style: `cursor: pointer; font-size: 12px; fill: #303030`,
      'data-node': JSON.stringify(this.job)
    })
    tSpan2.innerHTML = `${this.job.jobTypeCn} / ${this.job.state}`

    oText.appendChild(tSpan)
    oText.appendChild(tSpan2)

    oG.appendChild(oRect)
    oG.appendChild(oText)
    document.getElementById(this.containerId).appendChild(oG)
    return oG
  }

  // 绘制带箭头的曲线条
  drawLine (start = {}, end = {}, arrow = {}) {
    const oG = createTag('g')
    let pathLine = ''
    if (start.y < end.y) {
      pathLine = Math.abs(start.y - end.y) < 10 ? ` M${start.x} ${start.y} L${end.x} ${end.y} ` : ` M${start.x} ${start.y} L${(end.x + start.x) / 2} ${start.y}
          Q${(end.x + start.x) / 2 + 10} ${start.y} ${(end.x + start.x) / 2 + 10} ${start.y + 10}
          L${(end.x + start.x) / 2 + 10} ${end.y - 10}
          Q${(end.x + start.x) / 2 + 10} ${end.y} ${(end.x + start.x) / 2 + 20} ${end.y}
          L${end.x} ${end.y}`
    } else {
      pathLine = Math.abs(start.y - end.y) < 10 ? ` M${start.x} ${start.y} L${end.x} ${end.y} ` : ` M${start.x} ${start.y} L${(end.x + start.x) / 2} ${start.y}
          Q${(end.x + start.x) / 2 + 10} ${start.y} ${(end.x + start.x) / 2 + 10} ${start.y - 10}
          L${(end.x + start.x) / 2 + 10} ${end.y + 10}
          Q${(end.x + start.x) / 2 + 10} ${end.y} ${(end.x + start.x) / 2 + 20} ${end.y}
          L${end.x} ${end.y} `
    }
    const oLine = createTag('path', {
      d: pathLine,
      style: 'fill: none; stroke: #303030; stroke-width: 2;'
    })
    const oArrow = createTag('path', {
      d: `M${arrow.x} ${arrow.y} ${arrow.other} Z`,
      style: 'fill: #303030; stroke: #303030; stroke-width: 2;'
    })
    oG.appendChild(oLine)
    oG.appendChild(oArrow)
    document.getElementById(this.containerId).appendChild(oG)
    return oG
  }
}

export class NodeGraph {
  constructor (dom, options = {}) {
    this.center = null
    this.svgChart = dom
    this.gap = 10
  }

  // 设置nodes坐标
  setNodes (data = {}) {
    const _that = this
    let preMaxWidth = 0
    let nextMaxWidth = 0
    this.center = new DagNode()
    // 中心节点
    const centerNode = new DagNode(data)
    centerNode.prev = []
    centerNode.next = []
    centerNode.offsetX = this.svgChart.getBoundingClientRect().width / 2 - centerNode.width / 2 + 50
    // 设置父节点node
    if (Object.prototype.hasOwnProperty.call(data, 'parentList') && data.parentList.length > 0) {
      data.parentList.forEach((item, index) => {
        const node = new DagNode(item)
        if (index === 0) {
          node.offsetX = centerNode.offsetX - 100 - node.width
          node.offsetY = centerNode.offsetY - _that.gap > 60 ? _that.gap : 60
          preMaxWidth = preMaxWidth > node.width ? preMaxWidth : node.width
        } else {
          node.offsetX = centerNode.offsetX - 100 - node.width
          node.offsetY = centerNode.offsetY - _that.gap > 60 ? _that.gap + centerNode.prev[index - 1].offsetY : 60
          preMaxWidth = preMaxWidth > node.width ? preMaxWidth : node.width
        }
        centerNode.prev.push(node)
      })
    }
    // 设置子节点node
    if (Object.prototype.hasOwnProperty.call(data, 'childrenList') && data.childrenList.length > 0) {
      data.childrenList.forEach((item, index) => {
        const node = new DagNode(item)
        if (index === 0) {
          node.offsetX = 100 + centerNode.offsetX + centerNode.width
          node.offsetY = centerNode.offsetY - _that.gap > 60 ? _that.gap : 60
          nextMaxWidth = nextMaxWidth > node.width ? nextMaxWidth : node.width
        } else {
          node.offsetX = 100 + centerNode.offsetX + centerNode.width
          node.offsetY = centerNode.offsetY - _that.gap > 60 ? _that.gap + centerNode.next[index - 1].offsetY : 60
          nextMaxWidth = nextMaxWidth > node.width ? nextMaxWidth : node.width
        }
        centerNode.next.push(node)
      })
    }
    this.center = centerNode
  }

  drawSvg () {
    if (!this.center.job.jobName) return
    const pNode = this.center.prev
    const nNode = this.center.next
    // 设置画板的高
    this.svgChart.style.height = Math.max(pNode.length, nNode.length) * 80 || 100 + 'px'
    // 设置中心node
    this.center.offsetY = this.svgChart.clientHeight / 2 - this.center.height / 2
    this.center.drawNode()
    // 计算每个父节点距离顶部的距离
    // eslint-disable-next-line no-return-assign
    const prevTopGap = (parseInt(this.svgChart.style.height) - pNode.reduce((sum, cur) => { return sum += cur.height }, 0)) / (pNode.length + 1)
    // 计算每个子节点距离顶部的距离
    // eslint-disable-next-line no-return-assign
    const nextTopGap = (parseInt(this.svgChart.style.height) - nNode.reduce((sum, cur) => { return sum += cur.height }, 0)) / (nNode.length + 1)

    pNode.length && pNode.forEach((node, index) => {
      if (pNode.length === 1) {
        node.offsetY = this.center.offsetY + this.center.height / 2 - node.height / 2
      } else {
        node.offsetY = index === 0 ? prevTopGap : prevTopGap + pNode[index - 1].height + pNode[index - 1].offsetY
      }
      // 绘制节点
      node.drawNode()
      // 绘制线条
      node.drawLine({
        x: node.offsetX + node.width,
        y: node.offsetY + node.height / 2
      }, {
        x: this.center.offsetX - 4,
        y: this.center.offsetY + this.center.height / 2
      }, {
        x: this.center.offsetX - 2,
        y: this.center.offsetY + this.center.height / 2,
        other: 'l-6 -4 v8'
      }
      )
    })
    nNode.length && nNode.forEach((node, index) => {
      if (nNode.length === 1) {
        node.offsetY = this.center.offsetY + this.center.height / 2 - node.height / 2
      } else {
        node.offsetY = index === 0 ? nextTopGap : nextTopGap + nNode[index - 1].height + nNode[index - 1].offsetY
      }
      // 绘制节点
      node.drawNode()
      // 绘制线条
      node.drawLine({
        x: this.center.offsetX + this.center.width,
        y: this.center.offsetY + this.center.height / 2
      }, {
        x: node.offsetX - 4,
        y: node.offsetY + node.height / 2
      }, {
        x: node.offsetX - 2,
        y: node.offsetY + node.height / 2,
        other: 'l-6 -4 v8'
      }
      )
    })
  }
}
