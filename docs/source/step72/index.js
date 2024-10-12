/**
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 *
 * 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
 *
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 *
 *
 * 示例 1：
 *
 * 输入：x = 123
 * 输出：321
 * 示例 2：
 *
 * 输入：x = -123
 * 输出：-321
 * 示例 3：
 *
 * 输入：x = 120
 * 输出：21
 * 示例 4：
 *
 * 输入：x = 0
 * 输出：0
 *
 *
 * 提示：
 *
 * -231 <= x <= 231 - 1
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  const reg = /[0-9]*/;
  const [symbol] = x.toString().split(reg);
  const numList = !!symbol ? x.toString().split(symbol)[1].split('') : x.toString().split(symbol);
  let str = '';
  for (let i = numList.length - 1;i >=0; i--) {
    str += numList[i];
  }
  return Number(symbol + str);
};

console.log(reverse(-1234567));
