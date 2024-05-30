// 深克隆
function deepClone(value) {
    if (typeof value === 'object' && value !== null) {
        const result = Array.isArray(value) ? [] : {};
        for (const key in value) {
            result[key] = deepClone(value[key])
        }
        return result
    }
    return value
}

const obj1 = [1, 2, {a: 1, b: [1,2, { c: 3 }]}]
const obj2 = deepClone(obj1)
console.log(obj1)
console.log(obj2)
console.log(obj1 === obj2)
console.log(obj1[2] === obj2[2])
console.log(obj1[2].b === obj2[2].b)
console.log(obj1[2].b[2] === obj2[2].b[2])