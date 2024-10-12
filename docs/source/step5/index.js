// 奇怪的bug 零宽字符

// str -> 零宽字符
function strToZeroWidth(str) {
    return str
        .split('')
        .map(char => char.charCodeAt(0).toString(2)) // 1 0 空格
        .join(' ')
        .split('')
        .map(binaryNum => {
            if (binaryNum === '1') {
                return '​'; // &#8203;
            } else if (binaryNum === '0') {
                return '‌'; // &#8204;
            } else {
                return '‍'; // &#8205;
            }
        })
        .join('‎') // &#8206;
}

// 零宽字符 -> str
function zeroWidthToStr(zeroWidthStr) {
    return zeroWidthStr
        .split('‎') // &#8206;
        .map(char => {
            if (char === '​') { // &#8203;
                return '1';
            } else if (char === '‌') { // &#8204;
                return '0';
            } else { // &#8205;
                return ' ';
            }
        })
        .join('')
        .split(' ')
        .map(binaryNum => String.fromCharCode(parseInt(binaryNum, 2)))
        .join('')
}

const a = '我是谁？' + strToZeroWidth('da sa bi')
console.log(a, a.length);
const b = zeroWidthToStr(a.replace(/[^\u200b-\u200f\uFEFF\u202a-\u202e]/g, ""));
console.log(b);
