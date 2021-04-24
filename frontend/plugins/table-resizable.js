// cf : https://codepen.io/crwilson311/pen/Bajbdwd?editors=1010

import Vue from 'vue'

Vue.directive('table-resizable', {
  inserted(el) {

    let nodeName = el.nodeName
    if (['TABLE', 'THEAD'].indexOf(nodeName) < 0) {
        el = el.querySelector('table') // looking for the closest table
        if (!el) return
        nodeName = 'TABLE'
    }
    // console.log(`\nPL-table-resizable > nodeName : `, nodeName)
    const tableNode = nodeName === 'TABLE' ? el : el.parentElement
    
    const resizableGrid = (table) => {
      const thead = table.querySelector('thead')
      const ths = thead.querySelectorAll('th')
      // console.log(`PL-table-resizable > ths : `, ths)
      if (!ths) return
      table.style.overflow = 'scroll'
      let tableHeight = table.offsetHeight
      for (const th of ths){
        // console.log(`PL-table-resizable > th : `, th)
        let div = createDiv(tableHeight)
        th.appendChild(div)
        th.style.position = 'relative'
        setListeners(div)
      }
    }

    const setListeners = (div) => {
      let pageX, curCol, nxtCol, curColWidth, nxtColWidth
      div.addEventListener('mousedown', (e) => {
        curCol = e.target.parentElement
        nxtCol = curCol.nextElementSibling
        pageX = e.pageX
        let padding = paddingDiff(curCol)
        curColWidth = curCol.offsetWidth - padding;
        if (nxtCol)
          nxtColWidth = nxtCol.offsetWidth - padding;
      })
      div.addEventListener('mouseover', (e) => {
        e.target.style.borderRight = '2px solid #0000ff'
      })
      div.addEventListener('mouseout', (e) => {
        e.target.style.borderRight = ''
      })
      document.addEventListener('mousemove', (e) => {
        if (curCol) {
          let diffX = e.pageX - pageX
          if (nxtCol) {
            nxtCol.style.width = (nxtColWidth - (diffX))+'px'
            curCol.style.width = (curColWidth + diffX)+'px'
          }
        }
      })
      document.addEventListener('mouseup', (e) => { 
        curCol = undefined
        nxtCol = undefined
        pageX = undefined
        nxtColWidth = undefined
        curColWidth = undefined
      })
    }

    const createDiv = (height) => {
      let div = document.createElement('div')
      div.style.top = 0
      div.style.right = 0
      div.style.width = '5px'
      div.style.position = 'absolute'
      div.style.cursor = 'col-resize'
      div.style.userSelect = 'none'
      div.style.height = height + 'px'
      return div
    }
    
    const paddingDiff = (col) => {
      if (getStyleVal(col,'box-sizing') == 'border-box'){
        return 0
      }
      let padLeft = getStyleVal(col,'padding-left')
      let padRight = getStyleVal(col,'padding-right')
      return (parseInt(padLeft) + parseInt(padRight))

    }

    const getStyleVal = (elm,css) => {
      return (window.getComputedStyle(elm, null).getPropertyValue(css))
    }

    resizableGrid(tableNode)

  }
})
