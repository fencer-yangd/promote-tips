/**
 实现以下操作
 add[1] = 1;
 add[1][2][3] = 6;
 add[1][2][3] + 4 = 10
 */
function createAdd(sum = { sum: 0 }) {
  const handler = {
    get(target, prop) {
      if (prop === Symbol.toPrimitive) {
        const result = sum.sum;
        sum.sum = 0;
        return () => result;
      }
      if (['string', 'number'].includes(typeof prop)) {
        sum.sum += (isNaN(Number(prop)) ? 0 : Number(prop));
        return new Proxy(createAdd(sum), handler);
      }
      return new Proxy(createAdd(sum), handler);
    },
    apply(target, thisArg, args) {
      const result = self.sum;
      sum.sum = 0;
      return result;
    }
  };
  return new Proxy(() => {}, handler);
}
const add = createAdd();
console.log(add[1] + 2); // 输出 3
console.log(add[1][2][3] + 3); // 输出 9
console.log(add[1][2][3] + 4); // 输出 10
