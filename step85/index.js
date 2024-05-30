/**
 * 三数之和
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
 *
 * 你返回所有和为 0 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 * 示例 2：
 *
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 * 示例 3：
 *
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 *
 *
 * 提示：
 *
 * 3 <= nums.length <= 3000
 * -105 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const result = [];
  let i = 0;
  let j = 0;
  let k = 0;

  while (i < nums.length) {
    if (i === j) {
      j++;
      continue;
    }
    if (i === k) {
      k++;
      continue;
    }
    if (j === k) {
      k++;
      continue;
    }
    if (j >= nums.length) {
      j = 0;
      i++;
      continue;
    }
    if (k >= nums.length) {
      k = 0;
      j++;
      continue;
    }

    const sum = nums[i] + nums[j] + nums[k];
    if (sum === 0) {
      const list = sort([nums[i], nums[j], nums[k]]);
      if (!hasSame(result, list)) result.push(list);
    }
    k++;
  }

  function hasSame(list, l1) {
    const listStr = list.map(item => item.join(''));
    return listStr.includes(l1.join(''));
  }

  function sort(list) {
    const [n1, n2, n3] = list;
    let _r = [];
    const max = Math.max(n1, n2);
    const min = Math.min(n1, n2);
    if (n3 >= max) {
      _r = [min, max, n3];
    }
    if (n3 <= min) {
      _r = [n3, min, max];
    }
    if (n3 < max && n3 > min) {
      _r = [min, n3, max];
    }
    return _r;
  }


  return result;
};

console.log(threeSum([-1,0,1,2,-1,-4]))
