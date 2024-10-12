function changeTemplateStr(str, obj) {
  const reg = /\{\{(\w+)}}/g;
  if(!str) return '';
  return str.replace(reg, (_, match) =>{
    return obj[match] || ''
  })
}

const c = changeTemplateStr('{{a}}sdsd{{b}}', {a: 1, b:2});
console.log(c);
