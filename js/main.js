/**
 * Created by cycbot on 2017/8/3.
 */
let select = document.querySelector('#select')
let startBtn = document.querySelector('#startBtn')
let randomBtn = document.querySelector('#randomBtn')
let originArr = []


randomBtn.addEventListener('click', () => {
  for (let i = 0; i < 15; i++) {
    originArr[i] = Math.floor(Math.random() * 30) + 1
  }
  animate.init(originArr)
  startBtn.disabled = false
})

startBtn.addEventListener('click', () => {
  let states = []
  if (!originArr.length) return
  switch (select.value) {
    case '选择排序':
      states = selectionSort(originArr)
      animate.start(states)
      break
  }
})

function selectionSort(arr) {
  let states = []
  for (let i = 0, len = arr.length;i < len;i++) {
    let min = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j
        states.push({base: min, index: j})
      } else {
        states.push({base: min, index: j})
      }
    }
    if (min !== i) {
      swap(arr, min, i)
      states.push([min, i])
    }
  }
  return states
}

function swap(arr, a, b) {
  let temp
  temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}