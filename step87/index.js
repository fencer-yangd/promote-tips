/**
 * 17. 电话号码的字母组合
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 *
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 示例 2：
 *
 * 输入：digits = ""
 * 输出：[]
 * 示例 3：
 *
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 *
 *
 * 提示：
 *
 * 0 <= digits.length <= 4
 * digits[i] 是范围 ['2', '9'] 的一个数字。
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }

  if (digits.length === 0) return [];
  if (digits.length === 1) return map[digits[0]].split('');
  const len = digits.length;
  const result = [];
  const values = digits.split('').map(item => map[item].split(''));
  const flags = new Array(len).fill(0);

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

  while (flags[0] < values[0].length) {
    if (toBord(flags, values)) {
      continue;
    }
    let _result = '';
    for(let i = 0; i< flags.length; i++) {
      _result += values[i][flags[i]];
    }
    result.push(_result);
    flags[flags.length - 1]++;
  }
  return result;
};


console.log(letterCombinations('23'))
console.log(letterCombinations('237'));
