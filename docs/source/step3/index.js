// 字节面试题

// 数组求和
// 要求 不使用循环 不使用标准库函数

function sum(nums) {
  function func(i) {
      return i >= nums.length ? 0 : nums[i] + func(i + 1)
  }
  return func(0);
}

console.log(sum([1,2,3,3]))
console.log(sum([]))
