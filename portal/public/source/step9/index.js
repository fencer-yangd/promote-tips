// 面试题： 数字格式化

const str = "12345678900";

const a = /(?=\B(\d{3})+$)/g;

const b = str.replace(a, ",");

console.log(b);
