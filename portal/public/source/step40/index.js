/**
 * 实现 a[1][2][3] + 4 = 10;
 */

function createAdd() {
  if (!this.sum) { this.sum = 0 }
  const self = this;
  const handler = {
    get(target, prop) {
      if (prop === Symbol.toPrimitive) {
          return () => self.sum;
      }
      if (['string', 'number'].includes(typeof prop)) {
        self.sum += (isNaN(Number(prop)) ? 0 : Number(prop));
        return new Proxy(createAdd(), handler);
      }
      return new Proxy(createAdd(), handler);
    },
    apply(target, thisArg, args) {
      console.log('apply');
      const result = self.sum;
      self.sum = 0;
      return result;
    }
  };

  return new Proxy(() => {}, handler);
}

const add = createAdd();

console.log(add[1]); // 输出 1
console.log(add[1][2][3]); // 输出 6
console.log(add[1][2][3] + 4); // 输出 10

function toProxy(obj, val) {
  const handler = {
    get(target, prop) {
      if (target[prop] === undefined) {
        return val;
      }
      if (typeof target[prop] === 'object') {
        return toProxy(target[prop], val);
      }

      return target[prop] || val;
    },
    apply(target, thisArg, args) {
      console.log('apply');
      // return obj;
    }
  }
  return new Proxy(obj, handler)
}

const obj1 = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  }
}

const obj2 = toProxy(obj1);

console.log(obj2.a.b.c.d); // 输出 1
