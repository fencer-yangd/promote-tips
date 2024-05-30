/**
 * 寻找两个正序数组的中位数
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 *
 * 算法的时间复杂度应该为 O(log (m+n)) 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 * 示例 2：
 *
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 *
 *
 *
 *
 * 提示：
 *
 * nums1.length == m
 * nums2.length == n
 * 0 <= m <= 1000
 * 0 <= n <= 1000
 * 1 <= m + n <= 2000
 * -106 <= nums1[i], nums2[i] <= 106
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let i = 0;
  let j = 0;
  const array = [];
  while(i < nums1.length || j < nums2.length) {
    const n1 = nums1[i];
    const n2 = nums2[j];
    if (i >= nums1.length) {
      array.push(n2);
      j++;
      continue;
    }
    if (j >= nums2.length) {
      array.push(n1);
      i++;
      continue;
    }
    if (n1 < n2) {
      array.push(n1);
      i++;
    }
    if (n1 === n2) {
      array.push(n1, n2);
      i++;
      j++;
    }
    if (n1 > n2) {
      array.push(n2);
      j++;
    }
  }
  const len = array.length;
  if (len % 2 === 0) {
    const i1 = len / 2;
    const i2 = i1 - 1;
    return (array[i1] + array[i2]) / 2
  } else {
    const i = (len - 1) / 2;
    return array[i]
  }

};

console.log(findMedianSortedArrays([1,3], [2]))
