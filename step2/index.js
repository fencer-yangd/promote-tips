// 神奇的 undefined (大厂都会要求不写undefined)

function fun() {
    const undefined = 1;
    const a = undefined;
    console.log(a);
}

fun() // 1

// so 我们可以使用 void 关键字 来规避使用 undefined
// for example

{
    const a = void 0 // or void 任意表达式
    console.log(a) // undefined
}

