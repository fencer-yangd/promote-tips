// 数组nums中包含1个或多个正整数
// 其他的数字都出现2次
// 只有一个数字出现了1次
// 找出只出现1次的数字

function uniqueNum(nums) {
  return nums.reduce((a, b) => a ^ b, 0);
}

console.log(uniqueNum([1, 2, 2, 3, 1]));

// a^b^c === c^b^a
// a^a === 0
// 0^a === a
