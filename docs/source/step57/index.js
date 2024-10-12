const symbolName = Symbol();
const obj = {
  objNumber: new Number(1),
  number: 1,
  objString: new String("ss"),
  string: "stirng",
  objRegexp: new RegExp("\\w"),
  regexp: /w+/g,
  date: new Date(),
  function: function a() {},
  array: [{ a: 1 }, 2],
  [symbolName]: Symbol('12'),
  Map: new Map(),
  Set: new Set(),
};
obj.d = obj;

const o = deepClone(obj);
console.log(o.objNumber === obj.objNumber);
console.log(o.number === obj.number);
console.log(o.objString === obj.objString);
console.log(o.string === obj.string);
console.log(o.objRegexp === obj.objRegexp);
console.log(o.regexp === obj.regexp);
console.log(o.date === obj.date);
console.log(o.function === obj.function);
console.log(o.array[0] === obj.array[0]);
console.log(o[symbolName] === obj[symbolName]);
console.log(o.Map === obj.Map);
console.log(o.Set === obj.Set);


function deepClone(data, hash = new WeakMap()) {
  if (data === null) return data;
  if (typeof data === 'function') {
    // return new Function('return ' + data.toString())()
    const Constructor = Object.getPrototypeOf(data).constructor;
    return new Constructor(data);
  }
  if (typeof data === 'object') {
    if (hash.has(data)) return data;
    if (["[object Object]", '[object Array]'].includes(Object.prototype.toString.call(data))) {
      const newData = Array.isArray(data) ?  [] : {};
      if (!Array.isArray(data)) {
        hash.set(data, data);
      }
      for (const key of Object.getOwnPropertyNames(data)) {
        newData[key] = deepClone(data[key], hash);
      }
      return newData;
    }
    const Constructor = Object.getPrototypeOf(data).constructor;
    return new Constructor(data);
  }
  return data;
}
