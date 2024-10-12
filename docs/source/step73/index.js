/**
 * 给你一个字符串 s，找到 s 中最长的回文
 * 子串
 * 。
 *
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 示例 2：
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 * 提示：
 *
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 */
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  function isPalindrome(str) {
    const reversArray = [];
    for (let i = str.length - 1;i >= 0; i--) {
      reversArray.push(str[i]);
    }
    return reversArray.join('') === str
  }
  const list = [];
  let flag = 0;
  let i = flag + 1;
  while(flag < s.length - 1) {
    const str = s.slice(flag, i);
    if (isPalindrome(str)) {
      list.push(str);
    }
    if (i === s.length - 1) {
      flag++;
      i = flag + 1;
    } else {
      i++;
    }
  }
  let maxStr = '';
  for(let i = 0; i< list.length; i++) {
    if (list[i].length > maxStr.length) {
      maxStr = list[i];
    }
  }
  return maxStr;
};

console.log(longestPalindrome("babad"));
