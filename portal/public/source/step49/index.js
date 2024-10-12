function SingleClass(ClassName, ...args) {
  let _instance;
  return new Proxy(ClassName, {
    construct(target) {
      if (!_instance) _instance = new target(...args);
      return _instance;
    },
  });
}

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
