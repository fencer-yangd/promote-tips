const a = "😄是😭考试客户端开始的";

function getStringLength(str) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.codePointAt(i);
    if (code <= 0xffff) result++;
  }
  return result;
}

function getSubString(str, start, end) {
  function getSubCode(str, result, _pdx, _cdx) {
    const code = str.codePointAt(_cdx);
    if (_cdx >= str.length || _pdx >= end) return result;
    let _result = result;
    if (_pdx >= start && _pdx < end) {
      _result = result + String.fromCodePoint(code);
    }
    if (code > 0xffff) return getSubCode(str, _result, _pdx + 1, _cdx + 2);
    else return getSubCode(str, _result, _pdx + 1, _cdx + 1);
  }

  return getSubCode(str, "", 0, 0);
}

function getStrByIndex(str, index) {
  function getStr(str, _pdx, _cdx) {
    if (_cdx >= str.length) return "";
    const code = str.codePointAt(_cdx);
    if (_pdx === index) return String.fromCodePoint(code);
    if (code > 0xffff) return getStr(str, _pdx + 1, _cdx + 2);
    return getStr(str, _pdx + 1, _cdx + 1);
  }

  return getStr(str, 0, 0);
}

console.log(a.length);
console.log(getStringLength(a));
console.log(getSubString(a, 0, 6));
console.log(getStrByIndex(a, 2));
