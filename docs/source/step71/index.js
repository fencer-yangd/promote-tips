/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 *
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 *
 * 请你实现这个将字符串进行指定行数变换的函数：
 *
 * string convert(string s, int numRows);
 *
 *
 * 示例 1：
 *
 * 输入：s = "PAYPALISHIRING", numRows = 3
 * 输出："PAHNAPLSIIGYIR"
 * 示例 2：
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 * 示例 3：
 *
 * 输入：s = "A", numRows = 1
 * 输出："A"
 *
 *
 * 提示：
 *
 * 1 <= s.length <= 1000
 * s 由英文字母（小写和大写）、',' 和 '.' 组成
 * 1 <= numRows <= 1000
 * @param s
 * @param numRows
 * @return {string}
 */


var convert = function(s, numRows) {
  function pai(list, i, flag) {
    if (flag >= s.length) return;
    if (!list[i]) list[i] = new Array(numRows).fill('');
    if(i % (numRows - 1) === 0) {
      for (let n = 0; n < numRows; n++) {
        if (flag >= s.length) break;
        const str = s[flag];
        flag++;
        list[i][n] = str;
      }
      pai(list, i + 1, flag);
    } else {
      const idx = i % (numRows - 1);
      const str = s[flag];
      flag++;
      list[i][numRows - idx - 1] = str;
      i++;
      pai(list, i, flag);
    }

  }
  const list = [];
  pai(list, 0, 0);
  let result = '';
  let flag = 0;
  while (flag < numRows) {
    for (let i = 0; i< list.length; i++) {
      if (list[i][flag]) {
        result += list[i][flag];
      }
    }
    flag ++;
  }
  return result;
};

console.log(convert('PAYPALISHIRING', 4));
