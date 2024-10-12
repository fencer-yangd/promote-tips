// 找出一个字符串中重复次数最多的字母？

function getMoreLetter(_str) {
  function getNumsMap(data, str) {
    if (!str) return;
    const letterReg = str[0];
    const len = str.length;
    const newStr = str.replaceAll(new RegExp(letterReg, 'g'), '');
    data[letterReg] = len - newStr.length;
    return getNumsMap(data, newStr);
  }
  const result = {};
  getNumsMap(result, _str, 0);
  const max = Math.max(...Object.values(result));
  return Object.keys(result).find(item => result[item] === max);
}

function getMoreLetter1(str) {
  const result = {};
  for(let i in str) {
    if(!result[str[i]]) {
      result[str[i]] = 0;
    }
    result[str[i]]++;
  }
  const max = Math.max(...Object.values(result));
  return Object.keys(result).find(item => result[item] === max);
}

function getMoreLetter2(_str) {
  function getNumsMap(data, str) {
    if (!str) return;
    const letterReg = str[0];
    const len = str.length;
    const newStr = str.split(letterReg).join('');
    data[letterReg] = len - newStr.length;
    return getNumsMap(data, newStr);
  }
  const result = {};
  getNumsMap(result, _str, 0);
  const max = Math.max(...Object.values(result));
  return Object.keys(result).find(item => result[item] === max);
}

function getMoreLetter3(str) {
  const result = {};
  str.replace(/./g, (_) => {
    if (!result[_]) result[_] = 0;
    result[_]++;
  });
  const max = Math.max(...Object.values(result));
  return Object.keys(result).find(item => result[item] === max);
}

let str = "foo ".repeat(1000000);

// Using replaceAll
console.time('replaceAll');
getMoreLetter(str)
console.timeEnd('replaceAll');


// each
console.time('each');
getMoreLetter1(str);
console.timeEnd('each');

// Using split and join
console.time('split-join');
getMoreLetter2(str);
console.timeEnd('split-join');

// using replaceAll function
console.time('replace all function');
getMoreLetter3(str);
console.timeEnd('replace all function');
