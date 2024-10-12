// 面试题
// 闭包的漏洞
// 不改变函数内代码，修改obj

// {
//   const o = (function () {
//     const obj = {
//       a: 1,
//       b: 2,
//     };
//     return {
//       get: function (k) {
//         return obj[k];
//       },
//     };
//   })();

//   Object.defineProperty(Object.prototype, "abc", {
//     get: function () {
//       return this;
//     },
//   });

//   const obj2 = o.get("abc"); // obj
//   obj2.a = 4;
//   obj2.b = 5;
//   console.log(o.get("a"));
//   console.log(o.get("b"));
// }

// // 如何去避免修改obj

// // solve 1

// {
//   const o = (function () {
//     const obj = {
//       a: 1,
//       b: 2,
//     };
//     return {
//       get: function (k) {
//         if (obj.hasOwnProperty(k)) {
//           return obj[k];
//         }
//         return undefined;
//       },
//     };
//   })();

//   Object.defineProperty(Object.prototype, "abc", {
//     get: function () {
//       return this;
//     },
//   });

//   const obj2 = o.get("abc"); // undefined
//   obj2.a = 4; // error
//   obj2.b = 5; // error
//   console.log(o.get("a"));
//   console.log(o.get("b"));
// }

// // solve 2
// {
//   const o = (function () {
//     const obj = {
//       a: 1,
//       b: 2,
//     };
//     Object.setPrototypeOf(obj, null);
//     return {
//       get: function (k) {
//         return obj[k];
//       },
//     };
//   })();

//   Object.defineProperty(Object.prototype, "abc", {
//     get: function () {
//       return this;
//     },
//   });

//   const obj2 = o.get("abc"); // undefined
//   obj2.a = 4; // error
//   obj2.b = 5; // error
//   console.log(o.get("a"));
//   console.log(o.get("b"));
// }


// {
//   const  o = (function() {
//     const obj = {
//       a: 1,
//       b: 2,
//     };
//     Object.setPrototypeOf(obj, null);
//     return {
//       get: function(key) {
//         if (obj.hasOwnProperty(key)) {
//           return obj[key];
//         }
//         return void 0;
//       }
//     }
//   })();

//   o.get('a');
// }

{
  function createObj() {
    // 私有变量
    let a;
    let b;
  
    // 返回一个对象，包含访问和修改私有变量的方法
    const obj = {
      // 设置 a 的值
      setA(value) {
        a = value;
      },
      // 获取 a 的值
      getA() {
        return a;
      },
      // 设置 b 的值
      setB(value) {
        b = value;
      },
      // 获取 b 的值
      getB() {
        return b;
      }
    };
  
    // 冻结对象，防止扩展和修改
    Object.freeze(obj);
  
    return obj;
  }
  
  // 创建 obj 实例
  const obj = createObj();
  
  // 测试
  obj.setA(10);
  obj.setB(20);
  
  console.log(obj.getA()); // 10
  console.log(obj.getB()); // 20
  
  // 尝试添加新属性
  obj.newProp = 30;
  console.log(obj.newProp); // undefined
  
  // 尝试使用 Object.defineProperty 添加新属性
  // Object.defineProperty(obj, 'newProp', {
  //   value: 30,
  //   writable: true,
  //   enumerable: true,
  //   configurable: true
  // });
  console.log(obj.newProp); // undefined
}