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

function changeTemplateStr(str, obj) {
    const reg = /\{\{(\w+)}}/g;
    if(!str) return '';
    return str.replace(reg, (_, match) =>{
        return obj[match] || ''
    })
}

const c = changeTemplateStr('{{a}}sdsd{{b}}', {a: 1, b:2});
console.log(c);
