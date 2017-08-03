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
    case '冒泡排序':
      states = bubbleSort(originArr)
      animate.start(states)
      break
    case '插入排序':
      states = insertionSort(originArr)
      animate.start(states)
      break
    case '快速排序':
      states = quickSort(originArr)
      animate.start(states)
      break
  }
})

function bubbleSort(arr) {
  let states = []
  for (let i = 0, len = arr.length;i < len - 1;i++) {
    for (let j = 0;j < len - 1 - i;j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j + 1, j)
        states.push([j + 1, j])
      }
    }
  }
  return states
}

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

function insertionSort(arr) {
  let temp, j, k, states = []
  for (let i = 1, len = arr.length;i < len;i++) {
    temp = arr[i]
    j = i - 1
    k = i
    while (j >= 0 && arr[j] > temp) {
      swap(arr, j, k)
      states.push([j, k])
      j--
      k--
    }
  }
  return states
}

function quickSort(arr, left = 0, len = arr.length) {
  let state = []
  quickSortRecurison(arr, left, len)
  function quickSortRecurison(ar, left, len) {
    let pivot
    if (left < len) {
      pivot = partition(arr, left, len)
      quickSortRecurison(arr, left, pivot - 1)
      quickSortRecurison(arr, pivot, len)
    }
    function partition(arr, left, len) {
      let pivot = left
      for (let right = left + 1;right < len;right++) {
        state.push({base: pivot, index: right})
        if (arr[pivot] >= arr[right]) {
          left++
          swap(arr, left, right)
          state.push([left, right])
        }
      }
      swap(arr, left, pivot)
      state.push([left, pivot])
      return left + 1
    }
  }
  return state
}



function swap(arr, a, b) {
  let temp
  temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}