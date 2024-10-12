// 判断x是否是2的n次方
function isPowerOf2(n) {
    return (n & (n - 1)) === 0
}

console.log(isPowerOf2(2))
console.log(isPowerOf2(3))
console.log(isPowerOf2(4))
console.log(isPowerOf2(8))

// 2 -> 10 -> 10 & 01 === 0
// 3 -> 11 -> 11 & 10 !== 0
// 4 -> 100 -> 100 & 011 === 0
// 8 -> 1000 -> 1000 & 0111 === 0
