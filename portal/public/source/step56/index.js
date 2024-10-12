function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}
// 要求：红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次。
const light = function (timer, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};

const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      return step();
    });
};

step();

function data() {
  const obj = {
    a: 1,
    b: 2,
  };

  return function (key) {
    return obj[key];
  };
}

const _data = data();

console.log(_data("a"));
console.log(_data("b"));
