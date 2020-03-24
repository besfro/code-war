// 归并排序
// 时间复杂度 O(nlogn)

// 归并方法
function merge(left, right) {
  let i = 0, j = 0
  let arr = []
  while(i < left.length && j < right.length) {
    arr.push(
      left[i] < right[j] 
        ? left[i++]
        : right[j++]
    )
  }
  return arr.concat(i < left.length ? left.slice(i) : right.slice(j))
}

function mergeSort(arr) {
  const len = arr.length
  if(len > 1) {
    const middle = Math.floor(len / 2)
    const left = mergeSort(arr.slice(0, middle))
    const right = mergeSort(arr.slice(middle))
    arr = merge(left, right)
  }
  return arr
}


// 生成随机数组用于测试
// random-随机数组/order-降序数组/same-元素相同的数组
function createArray(n, type = 'random') {
  const arr = []
  let i = n
  while(i > 0) {
    arr.push(
      type === 'random' 
        ? Math.floor( Math.random() * n )
        : type === 'order' ? i : 1
    )
    i--
  }
  return arr
}

// 返回函数执行时间
function getRuntime(fn) {
  const start = performance.now()
  fn()
  const end = performance.now() - start
  return end.toFixed(2)
}

function runNext(arr, fn) {
  if(arr.length > 0) {
    const runtime = getRuntime(
      () => fn(arr.shift())
    )
    console.log(`执行时间: ${runtime}毫秒`)
    return runNext(arr, fn)
  }
}

// 测试
console.group('quick sort test')
runNext(
  [10, 100, 200, 1000, 10000, 100000, 1000000],
  count => console.log(
    mergeSort(createArray(count))
  )
)

console.log('arary order ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
runNext(
  [100000, 1000000],
  count => console.log(
    mergeSort(createArray(count, 'order'))
  )
)

console.log('array same  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
runNext(
  [100000, 1000000],
  count => console.log(
    mergeSort(createArray(count, 'same'))
  )
)

console.groupEnd()

