/**
 * @description 神奇的正则
 */

const reg = /12/g;

const result = "123123";

console.log(reg.test(result));
// reg.lastIndex = 0;
console.log(reg.lastIndex);
console.log(reg.test(result));
console.log(reg.lastIndex);
// reg.lastIndex = 0;
console.log(reg.test(result));
