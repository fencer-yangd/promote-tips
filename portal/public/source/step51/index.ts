/**
 * @description 腾讯面试题
 * 两个大数相加，返回结果
 * @param a string 大数的字符串
 * @param b string 大数的字符串
 * @return string result
 * @tip 不能使用BigInt
 */
function sum(a: string, b: string): string {
  // const len = Math.max(a.length, b.length);
  // const num1 = a.padStart(len , '0');
  // const num2 = b.padStart(len, '0');
  // console.log(num1);
  // console.log(num2);
  // let result = '';
  // let carry = 0;
  // for (let i = len - 1; i >= 0; i--) {
  //   const n = (+num1[i]) + (+num2[i]) + carry;
  //   if (n > 9) {
  //     carry = ~~(n / 10);
  //     result += (n % 10);
  //   } else {
  //     carry = 0;
  //     result += n;
  //   }
  // }
  // if (carry > 0) result += carry;
  // return result.split('').reverse().join('');



  const len = Math.max(a.length, b.length);
  const num1 = a.padStart(len, '0');
  const num2 = b.padStart(len, '0');
  let result = '';
  let carry = 0;
  for(let i = len - 1; i >= 0; i--) {
    const n = (+num1[i]) + (+num2[i]) + carry;
    if (n > 9) {
      carry = ~~(n / 10);
      result += (n%10).toString();
    } else {
      carry = 0;
      result += n.toString();
    }
  }
  if (carry > 0) result += carry.toString();
  return result.split('').reverse().join('');
}

console.log(sum('222221278628362783628736278368273627836278362', '8273682362836287362873627328763283628736'));
