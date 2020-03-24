// 快排算法
// 时间复杂度 O(nlogn)

// 划分方法
function partition(arr, left, right) {  
  // 取中间值, 避免最坏情况
  const target = arr[Math.floor((left + right) / 2)]
  while(left <= right) {
    while(arr[left] < target) {
      left++
    }
    while(arr[right] > target) {
      right--
    }
    if(left <= right) {
      const temp = arr[left]
      arr[left] = arr[right]
      arr[right] = temp
      left++
      right--
    }
  }
  return left
}

// 快排 双指针
function quickSort(arr, left, right) {
  if(arr.length < 2) {
    return arr
  }
  const l = typeof left !== 'number' ? 0 : left
  const r = typeof right !== 'number' ? arr.length - 1 : right
  const index = partition(arr, l, r)
  l < index - 1 && quickSort2(arr, l, index - 1)
  r > index && quickSort2(arr, index, r)
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
    quickSort(createArray(count))
  )
)

console.log('arary order ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
runNext(
  [100000, 1000000],
  count => console.log(
    quickSort(createArray(count, 'order'))
  )
)

console.log('array same  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
runNext(
  [100000, 1000000],
  count => console.log(
    quickSort(createArray(count, 'same'))
  )
)

console.groupEnd()

