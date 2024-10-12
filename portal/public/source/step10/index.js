// 经典面试题
const res = ['1', '2', '3'].map(parseInt)
console.log(res);

// parseInt 进制在2～36 36 -》 10个数字+26字母
// parseInt('1', 0) 是否为0x开头，是则转化为16进制，否则转化为10进制
// parseInt('2', 1) 如果进制不为0, 2 ~ 36, 则直接返回NaN
// parseInt('3', 2) 将'3'字符串转化为2进制，未找到0/1，则返回NaN
