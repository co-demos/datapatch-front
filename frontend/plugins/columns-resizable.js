// cf : https://github.com/Kreyco/vue-columns-resizable/blob/master/src/plugins/vue-columns-resizable/index.js
import Vue from 'vue'

Vue.directive('columns-resizable', {
  inserted(el) {
    let nodeName = el.nodeName
    if (['TABLE', 'THEAD'].indexOf(nodeName) < 0) {
        el = el.querySelector('table') // looking for the closest table
        if (!el) return
        nodeName = 'TABLE'
    }
    console.log(`\nPL-columns-resizable > nodeName : `, nodeName)

    const table = nodeName === 'TABLE' ? el : el.parentElement
    const thead = table.querySelector('thead')
    const ths = thead.querySelectorAll('th')
    const barHeight = nodeName === 'TABLE' ? table.offsetHeight : thead.offsetHeight

    const resizeContainer = document.createElement('div')
    table.style.position = 'relative'
    resizeContainer.style.position = 'relative'
    resizeContainer.style.width = table.offsetWidth + 'px'
    resizeContainer.className = "vue-columns-resizable"
    table.parentElement.insertBefore(resizeContainer, table)

    console.log(`\nPL-columns-resizable > table : `, table)
    console.log(`\nPL-columns-resizable > resizeContainer : `, resizeContainer)

    let moving = false
    let movingIndex = 0

    ths.forEach((th, index) => {
      th.style.width = th.offsetWidth + 'px'

      if (index + 1 >= ths.length) return

      const nextTh = ths[index + 1]
      const bar = document.createElement('div')

      bar.style.position = 'absolute'
      bar.style.left = nextTh.offsetLeft - 4 + 'px'
      bar.style.top = 0
      bar.style.height = barHeight + 'px'
      bar.style.width = '8px'
      bar.style.cursor = 'col-resize'
      bar.style.zIndex = 1
      bar.className = 'columns-resize-bar'

      bar.addEventListener('mousedown', () => {
        console.log(`\nPL-columns-resizable > mousedown ... `)
        console.log(`PL-columns-resizable > bar : `, bar)
        moving = true
        movingIndex = index
        console.log(`PL-columns-resizable > movingIndex : `, movingIndex)
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
      })

      // bar.addEventListener('mouseover', (e) => {
      //   console.log(`\nPL-columns-resizable > mouseover > e :`, e)
      //   e.target.style.borderRight = '2px solid #0000ff !important'
      // })
  
      // bar.addEventListener('mouseout', (e) => {
      //   e.target.style.borderRight = ''
      // })

      console.log(`\nPL-columns-resizable > resizeContainer > bar :`, bar)
      resizeContainer.appendChild(bar)
    })

    const bars = resizeContainer.querySelectorAll('.columns-resize-bar')

    document.addEventListener('mouseup', () => {
      if (!moving) return
      console.log(`\nPL-columns-resizable > mouseup ... `)

      moving = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''

      bars.forEach((bar, index) => {
        const th = ths[index]
        const nextTh = ths[index + 1]
        th.style.width = th.offsetWidth + 'px'
        bar.style.left = nextTh.offsetLeft - 4 + 'px'
      })
    })

    const cutPx = str => parseInt(str.replace('px', ''))

    const handleResize = e => {
      if (moving) {
        console.log(`\n..........\n\nPL-columns-resizable > handleResize ... `)
        console.log(`\nPL-columns-resizable > handleResize > e.movementX :`, e.movementX)
        
        const th = ths[movingIndex]
        console.log(`PL-columns-resizable > handleResize > A > th :`, th)
        console.log(`PL-columns-resizable > handleResize > A > th.style.minWidth :`, th.style.minWidth)
        
        const nextTh = ths[movingIndex + 1]
        // console.log(`PL-columns-resizable > handleResize > A > nextTh :`, nextTh)
        // console.log(`PL-columns-resizable > handleResize > A > nextTh.style.width :`, nextTh.style.width)

        const bar = bars[movingIndex]
        // console.log(`PL-columns-resizable > handleResize > A > bar :`, bar)
        // console.log(`PL-columns-resizable > handleResize > A > bar.style.left :`, bar.style.left)

        th.style.width = cutPx(th.style.width) + e.movementX + 'px !important;'
        nextTh.style.width = cutPx(nextTh.style.width) - e.movementX + 'px !important;'
        bar.style.left = nextTh.offsetLeft - 4 + e.movementX + 'px !important;'

        console.log(`PL-columns-resizable > handleResize > B > th.style.width :`, th.style.width)
        console.log(`PL-columns-resizable > handleResize > B > th.style.minWidth :`, th.style.minWidth)
        // console.log(`PL-columns-resizable > handleResize > B > nextTh.style.width :`, nextTh.style.width)
        // console.log(`PL-columns-resizable > handleResize > B > bar.style.left :`, bar.style.left)

      }
    }

    console.log(`PL-columns-resizable > resizeContainer : `, resizeContainer)

    resizeContainer.addEventListener('mousemove', handleResize)
    table.addEventListener('mousemove', handleResize)
  },
})
