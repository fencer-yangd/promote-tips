/**
 * @description 29. 两数相除
 * 给你两个整数，被除数 dividend 和除数 divisor。将两数相除，要求 不使用 乘法、除法和取余运算。
 *
 * 整数除法应该向零截断，也就是截去（truncate）其小数部分。例如，8.345 将被截断为 8 ，-2.7335 将被截断至 -2 。
 *
 * 返回被除数 dividend 除以除数 divisor 得到的 商 。
 *
 * 注意：假设我们的环境只能存储 32 位 有符号整数，其数值范围是 [−231,  231 − 1] 。本题中，如果商 严格大于 231 − 1 ，则返回 231 − 1 ；如果商 严格小于 -231 ，则返回 -231 。
 *
 *
 *
 * 示例 1:
 *
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = 3.33333.. ，向零截断后得到 3 。
 * 示例 2:
 *
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = -2.33333.. ，向零截断后得到 -2 。
 *
 *
 * 提示：
 *
 * -231 <= dividend, divisor <= 231 - 1
 * divisor != 0
 */

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const divide = function(dividend, divisor) {
  const flag = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0);
  dividend = Math.abs(dividend);
  divisor = Math.abs(divisor);
  if (dividend === 0) return 0;
  if (divisor === 1) return flag ? dividend : -dividend;
  let result = 0;
  while (dividend >= divisor) {
    dividend -= divisor;
    result++;
  }
  return flag ? result : -result;
};

console.log(divide(10, -3))
