// 以前的函数使用：
function Fn() {
    console.log('called')
}

Fn()

new Fn();

// 以上的函数出现了二义性
// 故 很难判断怎么去使用函数

// so 我们可以使用如下约束

function fn() {
    if (new.target) {
        throw new Error('can not invoke with new')
    }
    console.log('called')
}

fn()
new fn(); // error

