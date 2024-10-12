// 小米面试题

function method(a, b, c) {
    console.log(a, b, c);
    a = 'a'; // 定义
    b = function b () {}; // 定义
    (function a() {}); // 函数表达式 没有执行 没有意义
    (function b() {}); // 函数表达式 没有执行 没有意义
    function c() {} // 函数声明
    console.log(a, b, c);
}
method(1, 2, 3)

// {} 为执行上下文块，执行上下文之前
// step1: 先确定行参 -> a: 1 b: 2 c: 3
// step2: 再确定函数声明 -> a: 1 b: 2 c: 3 c: function -> 变量c被覆盖 -> a: 1 b: 2 c: function
// step3: 记录变量定义，填充undefined -> a: 1 b: 2 c: function a: undefined b: undefined -> 如果出现重名直接忽略 -> a: 1 b: 2 c: function
// 执行上下文 -> a: 1 b: 2 c: function -> a: 'a' b: function c: function
