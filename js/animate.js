/**
 * Created by cycbot on 2017/8/3.
 */
(function (window) {
  let target = document.querySelector('#target')
  let timer, rects

  function start(states) {
    if (!states.length) return
    startBtn.disabled = true
    randomBtn.disabled = true
    rects = document.querySelectorAll('.rect')
    timer = setInterval(function () {
      rects.forEach((item) => {
        item.style.backgroundColor = 'blue'
      })
      let temp = states.shift()
      if (Array.isArray(temp)) {
        swapAnimate(temp[0], temp[1])
      } else {
        document.querySelector(`#rect${temp.base}`).style.backgroundColor = 'red'
        document.querySelector(`#rect${temp.index}`).style.backgroundColor = 'yellow'
      }

      if (!states.length) {
        clearInterval(timer)
        setTimeout(function () {
          rects.forEach( item => {
            item.style.backgroundColor = 'blue'
          })
          startBtn.disabled = false
          randomBtn.disabled = false
        }, 600)
      }
    }, 800)
  }

  function swapAnimate(a, b) {
    let rectA = document.querySelector(`#rect${a}`)
    let rectB = document.querySelector(`#rect${b}`)
    rectA.style.backgroundColor = 'yellow'
    rectB.style.backgroundColor = 'yellow'
    rectA.style.left = b * 30 + 'px'
    rectB.style.left = a * 30 + 'px'
    rectA.id = `rect${b}`
    rectB.id = `rect${a}`
  }

  function init(originArr) {
    while (target.firstChild) {
      target.removeChild(target.firstChild)
    }
    let fragment = document.createDocumentFragment()
    for (let i = 0;i < originArr.length;i++) {
      let div = document.createElement('div')
      div.className = 'rect'
      div.id = 'rect' + i
      div.textContent = originArr[i]
      div.style.height = (originArr[i] * 5 + 20) + 'px'
      div.style.left = 30 * i + 'px'
      fragment.appendChild(div)
    }
    target.appendChild(fragment)
  }

  window.animate = {
    init,
    start
  }
})(window)