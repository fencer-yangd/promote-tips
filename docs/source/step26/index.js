// 设置私有变量

class A {
  // _abc = 1;
  #abc = 1;

  // _method() {
  #method() {
    console.log(this.#abc);
  }

  method() {
    this.#method();
  }
}

const a = new A();
// console.log(a.#abc);
// a.#method();
a.method();
