/**
 * 最长公共前缀
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1：
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 示例 2：
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 *
 * 提示：
 *
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  let i = 0;
  let result = '';

  function isSameStr(_strs, i) {
    const newStrs = _strs.map(str => str[i]);
    const [s] = newStrs;
    return newStrs.every(item => item === s);
  }

  while(strs.every(item => i < item.length)) {
    if(isSameStr(strs, i)) {
      const str = strs[0][i];
      result += str;
      i++;
    } else {
      break;
    }
  }

  return result;
};


console.log(longestCommonPrefix(["flower","flow","flight"]))
console.log(longestCommonPrefix(["dog","racecar","car"]))
