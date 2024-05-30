// 快速生成随机字符串 -> 随机生成数字字母

function randomString() {
    return Math.random().toString(36).substr(2)
}

console.log(randomString())