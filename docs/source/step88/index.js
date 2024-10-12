/**
 * 四数之和
 *
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 *
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 * 你可以按 任意顺序 返回答案 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 * 示例 2：
 *
 * 输入：nums = [2,2,2,2,2], target = 8
 * 输出：[[2,2,2,2]]
 *
 *
 * 提示：
 *
 * 1 <= nums.length <= 200
 * -109 <= nums[i] <= 109
 * -109 <= target <= 109
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  const flags = new Array(4).fill(0).map((_, idx) => idx);
  const values = new Array(4).fill(nums);

  function toBord(list, values) {
    let isBord = false;
    let i;
    for (i = list.length - 1; i>=0;i--) {
      if (list[i] >= values[i].length) {
        isBord = true;
        break;
      }
    }
    if (isBord) {
      list[i - 1]++;
      for(let _i = i; _i < list.length; _i++) {
        list[_i] = 0;
      }
    }

    return isBord;
  }

  function sort(l) {
    const list = [...l];
    for (let i = 0; i< list.length - 1; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const ni = list[i];
        const nj = list[j];
        if (ni > nj) {
          const temp = list[i];
          list[i] = list[j];
          list[j] = temp;
        }
      }
    }
    return list;
  }

  function hasSame(_list, _target) {
    return _list.map(item => item.join('')).includes(_target.join(''));
  }

  function hasSameIndex(list) {
    return Object.keys(list.reduce((acc, cur) => {
      return {...acc, [cur]: 1}
    }, {})).length !== list.length;
  }

  let _result = [];
  while (flags[0] < values[0].length) {
    if (toBord(flags, values)) {
      continue;
    }
    const sum = flags.reduce((acc, cur, index) => {
      return acc + values[index][cur];
    }, 0);
    if (sum === target) {
      const res = sort(flags);
      if (!hasSame(_result, res) && !hasSameIndex(res)) _result.push(res);
    }
    flags[flags.length - 1]++;
  }

  const result = [];

  const __result =  _result.reduce((acc, cur) => {
    return [...acc, cur.map(item => nums[item])]
  }, [])

  for(let i = 0; i< __result.length; i++) {
    const res = sort(__result[i]);
    if (!hasSame(result, res)) {
      result.push(res);
    }
  }

  return result;
};


console.log(fourSum([2,2,2,2,2], 8))
