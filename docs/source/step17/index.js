// 经典面试题
// 不借助第三个变量完成变量交换

// const a = 3;
// const b = 4;

// solve 1

{
    let a = 3;
    let b = 4;
    a = a + b;
    b = a - b;
    a = a - b;
    console.log(a, b);
}

// solve2
{
    let a = 3;
    let b = 4;
    a = a ^ b;
    b = a ^ b; // b = a ^ b ^ b = 0 ^ a = a
    a = a ^ b; // a = a ^ b ^ a ^ b ^ b = a ^ a ^ b ^ b ^ b = 0 ^ 0 ^ b = b
    console.log(a, b);
}

// solve 3 es6
{
    let a = 3;
    let b = 4;
    [b , a] = [a, b]
}