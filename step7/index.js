// 实现 promise all

Promise.myAll = function(promises) {
    let res, rej;
    const _promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    })

    let count = 0;
    const result = [];
    let finishCount = 0;
    promises.forEach((val, key) => {
        count ++;
        Promise.resolve(val).then((data) => {
            result[key] = data;
            finishCount++;
            if (finishCount === count) {
                res(result)
            }
        }, rej);
    })

    if (count === 0) {
        res(result)
    }

    return _promise;
}

Promise.myAll([1,2,3]).then(console.log)
Promise.myAll([]).then(console.log)