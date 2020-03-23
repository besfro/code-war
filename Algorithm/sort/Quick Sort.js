// 快排
// 时间复杂度 O(nlogn)、O(logn)、O(n^2)最坏
// 空间复杂度 O(logn)
function quickSort(arr) {
  if(!Array.isArray(arr)) {
    return []
  }
  if(arr.length < 2) {
    return arr
  }
  // 随机数, 避免最坏情况 
  // 如果整个数组相同无法避免
  const target = arr.splice(arr.length / 2, 1)[0]
  const left = []
  const right = []
  for(let item of arr) {
    target < item 
      ? right.push(item)
      : left.push(item)  
  }
  return quickSort(left).concat( target, quickSort(right) )
}

function quickSort2(arr) {
  if(!Array.isArray(arr)) {
    return []
  }
  if(arr.length < 2) {
    return arr
  }
  // 随机数, 避免最坏情况 
  // 如果整个数组相同无法避免
  const target = arr.shift()
  const left = []
  const right = []
  for(let item of arr) {
    target < item 
      ? right.push(item)
      : left.push(item)  
  }
  return quickSort(left).concat( target, quickSort(right) )
}

// 生成随机数组用于测试
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

console.log('最坏情况, 倒序 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
runNext(
  [10, 100, 200, 1000, 10000, 100000, 1000000],
  count => console.log(
    quickSort(createArray(count, 'order'))
  )
)

console.log('最坏情况, 相同元素~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
runNext(
  [10, 100, 200, 1000, 10000],
  count => console.log(
    quickSort(createArray(count, 'same'))
  )
)

console.groupEnd()