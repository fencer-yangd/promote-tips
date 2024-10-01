function SingleClass(ClassName, ...args) {
  let _instance;
  return new Proxy(ClassName, {
    construct(target) {
      if (!_instance) _instance = new target(...args);
      return _instance;
    },
  });
}

// add() 0
// add(1)() 1
// add(1)(2) function
// add(1)(2)(3)() 6
// add(1)(2)....() 超过 Number.MAX_VALUE throw Error
// function add() {
//   let store = 0;
//   if(!arguments.length) return store;
//   if (arguments[0] - Number.MAX_VALUE > 0) throw new Error('max value');
//   store += arguments[0];
//   return function b() {
//     if(!arguments.length) return store;
//     if (store - Number.MAX_VALUE > 0) throw new Error('max value');
//     store += arguments[0];
//     return b;
//   }
// }

// Promise.allSettled

class A {
  a = 1;
  constructor() {}

  b(b) {
    this.a = b;
  }
}
const SingleClassA = SingleClass(A, '');
const a1 = new SingleClassA();
const a2 = new SingleClassA();
console.log(a1 === a2);
a1.b(3);
console.log(a2.a);


function SingleClass1(ClassName, ...args) {
  let instance;
  return new Proxy(ClassName, {
    construct(target) {
      if (!instance) instance = new target(...args);
      return instance
    }
  })
}
