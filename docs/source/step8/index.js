// 手写 call 不允许使用 apply bind

Function.prototype.myCall = function (ctx, ...args) {
    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
    const fn = Symbol('fn')
    Object.defineProperty(ctx, fn, {
        enumerable: false,
        value: this,
    })
    ctx[fn] = this;
    const result = ctx[fn](...args);
    delete ctx[fn];
    return result;
}


function methods(a, b) {
    console.log(this, a, b)
}

methods.myCall(null, 1, 2)
methods.myCall({}, 1, 2)
methods.myCall(1, 1, 2)
methods.myCall('a', 1, 2)