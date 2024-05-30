// 标记模版字符串

function tag() {
    console.log(arguments);
    console.log('da sa bi');
    return  tag;
    // return this;
    // return {};
}

const b = '23';
const test = tag`这是一个${b}``kdhksdh`;
console.log(test)