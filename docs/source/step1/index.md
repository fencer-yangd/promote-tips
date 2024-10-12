```js
// q: 是的下面的log内的表达式为true
// ?
// var a;
// console.log(
//     a == 1 &&
//     a == 2 &&
//     a == 3
// )

// solve 1：
{
  const a = {
    count: 1,
    valueOf: function () {
      return this.count++;
    },
  };
  console.log(a == 1 && a == 2 && a == 3);
}

// solve 2:
{
  const a = {
    count: 1,
    toString: function () {
      return this.count++;
    },
  };
  console.log(a == 1 && a == 2 && a == 3);
}

// solve 3:
{
  const a = {
    count: 1,
    [Symbol.toPrimitive]: function () {
      return this.count++;
    },
  };

  console.log(a == 1 && a == 2 && a == 3);
}

```
