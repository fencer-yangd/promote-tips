function createProxy(val = 0) {
  return new Proxy({}, {
    get(target, prop) {
      if (prop === Symbol.toPrimitive) {
        return () => val;
      }
      return createProxy(val + Number(prop));
    }
  })
}

const add = createProxy();

const r1 = add[1][2][3] + 4;
const r2 = add[10][20][30] + 40;
const r3 = add[100][200][300] + 400;


// console.log(r1, r2, r3); // 10 100 1000
//
// const a  = {
//   count: 0,
//   [Symbol.toPrimitive] () { return ++this.count}
// }
//
//
// console.log(
//     a == 1 &&
//     a == 2 &&
//     a == 3
// )

// const [a, b] = { a: 1, b: 2 }

function createObj() {
  const temp = Object.create(null);
  temp.a = 'a';
  const res = Object.create(null);
  res.get = (key) => {
    if (key in temp) { return temp[key] }
    return undefined
  }
  res.set = (key, val) => {
    if (key in temp) { temp[key] = val }
  }
  Object.freeze(res);
  return res
}

const obj = createObj();
console.log(obj.a) // undefined
console.log(obj.get('a')) // 'a'
obj.a = 1
console.log(obj.a) //  undefined
obj.set('a', 2)
console.log(obj.get('a')) // 2
obj.set('c', 2)
console.log(obj.get('c')) // undefined
console.log(obj.toString) // undefined
