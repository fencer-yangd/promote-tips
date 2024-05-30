class MemoizeMap {
  constructor() {
    this._objectMap = new WeakMap();
    this._singleMap = new WeakMap();
  }

  _isObject() {
    return typeof obj === 'object' && obj !== null;
  }

  set(obj, value) {
    if (this._isObject(obj)) {
      this._objectMap.set(obj, value);
    } else {
      this._singleMap.set(obj, value);
    }
  }
}

function memoize(fn, resolver) {
  const cache = new WeakMap();
  function memoized(...args) {
    const key = resolver ? resolver(...args) : args[0];
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }
  memoized.cache = new MemoizeMap();
  return memoized;
}

function memoize1(fn, resolver) {
  const cache = new WeakMap();
  function memoized(...args) {
    const key = resolver ? resolver(...args) : args[0];
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }
  memoized.cahce = new MemoizeMap();
  return memoized;
}

const object = { a: 1, b: 2 };
const other = {c: 3, d: 4};

const values = memoize((obj) => Object.values(obj));
console.log(values(object)); // [1, 2]

console.log(values(other)); // [3, 4]

object.a = 2;
console.log(values(object)); // [1, 2]

values.cache.set(object, [2, 2]);
console.log(values(object)); // [2, 2]


