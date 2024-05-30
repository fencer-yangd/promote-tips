/*珂珂喜欢吃香蕉。
 这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。
 警卫已经离开了，将在 H 小时后回来。珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。
 每个小时，她将会选择一堆香蕉，从中吃掉 K 根
 如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉
 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉
 返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。

  示例 1：
  输入: piles = [3,6,7,11], H = 8
  输出: 4

  示例 2：
  输入: piles = [30,11,23,4,20], H = 5
  输出: 30

  示例 3：
  输入: piles = [30,11,23,4,20], H = 6
  输出: 23

  提示：
  1 <= piles.length <= 10^4
  piles.length <= H <= 10^9
  1 <= piles[i] <= 10^9
*/

function getSpeed(piles, h) {
  if (h<= piles.length) {
    return Math.max(...piles);
  }

  const newArray = piles.sort((a, b) => a - b);

  let i = newArray.length - 1;
  function getMinSpeed () {
    const speed = newArray[i];
    const totalTime = newArray.reduce((acc, cur) => {
      const time = Math.ceil(cur / speed);
      return acc + time;
    }, 0);
    if (totalTime > h) {
      return void 0;
    }
    i--;
    getMinSpeed();
  }
  getMinSpeed();

  let start = newArray[i+1];
  let end = newArray[i];
  function getResultSpeed(_start, _end) {
    if (_start <= _end) return _end;
    const totalTime = newArray.reduce((acc, cur) => {
      const time = Math.ceil(cur / _start);
      return acc + time;
    }, 0);
    if (totalTime > h) {
      return _start;
    }
    return getResultSpeed(_start - 1, _end);
  }

  const result = getResultSpeed(start - 1, end);
  return result + 1;
}

console.log(getSpeed([3,6,7,11], 8));
console.log(getSpeed([30,11,23,4, 20], 5));
console.log(getSpeed([30,11,23,4, 20], 6));


// react
// expo react native
// vue 2.x
//
// html css js(ts) babel -> es5
// http:// -> dns -> ip -> html -> dom tree -> css tree ->  cssom tree -> 布局 -> 分层 will-change -> 光栅 -> 位图 -> GPU -> 画 （）
//
// 1 {
//   display: flex;
//
// }
//
// display: inline;
// text-align: center;
// line-height: 1;
//
// position: ;
// top: 0;
// bottom: 0;
// left: 0;
// right: 0;
// margin: auto;
//
// position: absolute;
// left: 50%;
// top: 50%;
// transform: translate(-50%, -50%);
//
// @import '';
//
// a {
//
// }
//
// instanceof
//
// in
// const a = [];
// Object.prototype.toString.call(a) [Object Array]
//
// Array.isArray()
//
// const a = {b: 2};
// const b = a;
// b.a++;
//
// JSON.parse(JSON.stringify(a));
// // function Symbol this
//
// // polyfill
// structuredClone()
//
// // deep call
// weakMap(object, object);
//
// function a () {
//   var a1 = 1;
//   return () => {
//     a1++;
//   }
// }
//
// const b = a();

// LCP FCP

// dns
//
