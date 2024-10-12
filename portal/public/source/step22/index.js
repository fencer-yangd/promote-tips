// 加法奇怪的运用

[] + {} // '[object Object]'

// js 解析会将加法两端的数据转化成原始值来做运算
// [].valueOf() -> [] 不是原始类型，继续调用toString [].toString() -> ''
// {}.valueOf() -> {} 不是原始类型，继续调用toString {}.toString() -> '[object Object]'
// '' + '[object Object]'

{} + [] // 0
// js在解析时发现{} 前面没有任何字符，则会解析成代码块，后面的会被解析成+[]
// 等同于 { ...code } +[] -> 0