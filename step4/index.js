// 让下面的代码成立,并且不能更改下面代码
// const [a, b] = { a: 1, b: 2 }

// solve

Object.prototype[Symbol.iterator] = function() {
    return Object.values(this)[Symbol.iterator]();
}

const [a, b] = {a: 1, b: 2};
console.log(a);
console.log(b);