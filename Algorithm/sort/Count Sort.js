// 计数排序
// 时间复杂度 O(n+k)

function findMax(arr) {
  let max = arr[0], i = arr.length - 1
  while(i > 0) {
    let item = arr[i]
    item > max && (max  = item)
    i--
  }
  return max
}

// 计数排序
function countSrot(arr) {
  const max = findMax(arr)
  const countArr = new Array(max + 1)
  let i = arr.length - 1
  while(i >= 0) {
    let temp = arr[i--]
    if(countArr[temp]) {
      countArr[temp]++
    } else {
      countArr[temp] = 1
    }
  }
  let sortIndex = 0
  for(let [index, count] of countArr.entries()) {
    while(count-- > 0) {
      arr[sortIndex++] = index
    }
  }
  return arr
}

// 生成随机数组用于测试
// random-随机数组/order-降序数组/same-元素相同的数组
function createArray(n, type = 'random') {
  const arr = []
  let i = 10000 || n
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
  [1000000],
  count => console.log(
    countSrot(createArray(count))
  )
)

// 倒序
runNext(
  [1000000],
  count => console.log(
    countSrot(createArray(count))
  )
)

console.groupEnd()