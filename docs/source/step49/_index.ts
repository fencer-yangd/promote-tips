class Base<T extends unknown[]> {
  /**
   * @constructor
   * @param args arguments
   */
  constructor(...args: T) {
    // some code
  }
}

/**
 * @description single class instance
 * @param ClassName class name
 * @param args arguments
 */
function SingleClass<
  T extends typeof Base<U>,
  U extends unknown[]
>(ClassName: T, ...args: U) {
  let _instance: T;
  return new Proxy(ClassName, {
    construct(target: T) {
      if (!_instance) _instance = new target(...args) as T;
      return _instance;
    },
  });
}

class A {
  a = 1;
  constructor() {}

  b(b: number) {
    this.a = b;
  }
}
const SingleClassA = SingleClass(A);
const a1 = new SingleClassA();
const a2 = new SingleClassA();
console.log(a1 === a2);
a1.b(3);
console.log(a2.a);
