// 阿里面试题

{
    const a = {}
    const b = { key: 'b' }
    const c = { key: 'c' }

    a[b] = 1
    a[c] = 2;

    console.log(a[b]) // 2
    console.log(a[c]) // 2
}

// 如何使得a[b] === 1 true a[c] === 2 true

// solve

{
    const a = {}
    const b = {
        key: 'b',
        toString: function() {
            return this.key
        }
    }
    const c = {
        key: 'c',
        toString: function() {
            return this.key
        }
    }

    a[b] = 1
    a[c] = 2;

    console.log(a[b]) // 1
    console.log(a[c]) // 2
}
