/**
 * 实现 a[1][2][3] + 4 = 10;
 */

const add = new Proxy(
  {
    _store: 0,
  },
  {
    get(target, param, receiver) {
      if (param === Symbol.toPrimitive) {
        return () => {
          return target._store;
        };
      }
      target._store += +param ?? 0;
      return receiver;
    },
  }
);

console.log(add[1][2][3] + 4);
