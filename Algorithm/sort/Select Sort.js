// 选择排序
// 时间复杂度 O(n^2)

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

// 插入排序
function selectSrot(arr, compareFn = Compare.defaultCompare) {
  let i = arr.length - 1
  while(i > 0) {
    let maxIndex = i
    let j = i - 1
    while(j >= 0) {
      if(
        Compare.runCompare(compareFn, arr[j], arr[maxIndex]).isSmall()
      ) {
        [arr[j], arr[maxIndex]] = [arr[maxIndex], arr[j]]
      }
      j--
    } 
    i--
  }
  return arr
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
  [1000],
  count => console.log(
    selectSrot(createArray(count))
  )
)

// 倒序
runNext(
  [1000],
  count => console.log(
    selectSrot(createArray(count), (a, b) => a - b)
  )
)

// 对象素组
runNext(
  [1000],
  count => console.log(
    selectSrot(createArray(count, 'object'), (a, b) => a.count - b.count)
  )
)

console.groupEnd()