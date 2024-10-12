/**
 * 最接近的三数之和
 *
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 *
 * 返回这三个数的和。
 *
 * 假定每组输入只存在恰好一个解。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 * 示例 2：
 *
 * 输入：nums = [0,0,0], target = 1
 * 输出：0
 *
 *
 * 提示：
 *
 * 3 <= nums.length <= 1000
 * -1000 <= nums[i] <= 1000
 * -104 <= target <= 104
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
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
    const idx = sort([i, j, k]);
    if (!hasSame(result.map(item => item.idx), idx)) {
      result.push({
        idx,
        sum
      });
    }
    k++;
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

  function hasSame(list, l1) {
    const listStr = list.map(item => item.join(''));
    return listStr.includes(l1.join(''));
  }

  const diffList = result.map(item => ({
    ...item,
    diff: Math.abs(item.sum - target),
  }));

  const min = Math.min(...diffList.map(item => item.diff));

  return diffList.find(item => item.diff === min).sum
};

console.log(threeSumClosest([-1,2,1,-4], 1));
