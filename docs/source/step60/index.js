function pipe(...fns) {
  return function (...args) {
    if (fns.length === 0) return;
    if (fns.length === 1) return fns[0](...args);
    return fns.reduce(
      (output, cur) => (Array.isArray(output) ? cur(...output) : cur(output)),
      args
    );
  };
}

function double(x) {
  return x * 2;
}

function square(x) {
  return x ** 2;
}

function addTen(x) {
  return x + 10;
}

const p = pipe(double, square, addTen);
console.log(p(2));

function getIndexOf(str, sub) {
  const reg = new RegExp(sub, "g");
  let result = -1;
  str.replaceAll(reg, (_, index) => {
    if (result !== -1 && index !== void 0) result = index;
  });
  return result;
}


function pipe1(...fns) {
  return function(...args) {
    if (fns.length === 0) return;
    if (fns.length === 1) return fns[0](...args);
    return fns.reduce((output, cur) => {
      return Array.isArray(output) ? cur(...output) : cur(output)
    }, args)
  }
}
