// 快排算法
// 时间复杂度 O(nlogn)

// 比较方法
class Compare {
  static runCompare(fn, left, right) {
    const v = fn(right, left)
    return {
      isLarge: () => v > 0,
      isSmall: () => v < 0,
    }
  }

  static defaultCompare(a, b) {
    return a - b
  }
}

// 划分方法
function partition(arr, left, right, compareFn) {  
  // 取中间值, 避免最坏情况
  const target = arr[Math.floor((left + right) / 2)]
  while(left <= right) {
    while(
      Compare.runCompare(
        compareFn,
        arr[left],
        target
      ).isLarge()
    ) {
      left++
    }
    while(
      Compare.runCompare(
        compareFn,
        target,
        arr[right]
      ).isLarge()
    ) {
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
function sort(arr, left, right, compareFn) {
  if(arr.length < 2) {
    return arr
  }
  const l = typeof left !== 'number' ? 0 : left
  const r = typeof right !== 'number' ? arr.length - 1 : right
  const index = partition(arr, l, r, compareFn)
  l < index - 1 && sort(arr, l, index - 1, compareFn)
  r > index && sort(arr, index, r, compareFn)
  return arr
}

function quickSort(arr, compareFn = Compare.defaultCompare) {
  return sort(arr, 0, arr.length - 1, compareFn)
}


// 生成随机数组用于测试
// random-随机数组/order-降序数组/same-元素相同的数组
function createArray(n, type = 'random') {
  const arr = []
  let i = n
  while(i > 0) {
    let random = Math.floor( Math.random() * n )
    arr.push(
      type === 'random' // 随机数组
        ? random 
        : type === 'order'  // 倒序数组
          ? i 
          : type === 'object' // 对象数组
            ? {count: random}
            : 1 // same
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
  [100000, 1000000],
  count => console.log(
    quickSort(createArray(count))
  )
)

// 倒序函数
runNext(
  [100000, 1000000],
  count => console.log(
    quickSort(createArray(count), (a, b) => b - a)
  )
)

// 对象素组
runNext(
  [100000, 1000000],
  count => console.log(
    quickSort(createArray(count, 'object'), (a, b) => b.count - a.count)
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

