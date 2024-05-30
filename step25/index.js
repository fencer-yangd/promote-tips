// 面试题
// 闭包的漏洞
// 不改变函数内代码，修改obj

{
  const o = (function () {
    const obj = {
      a: 1,
      b: 2,
    };
    return {
      get: function (k) {
        return obj[k];
      },
    };
  })();

  Object.defineProperty(Object.prototype, "abc", {
    get: function () {
      return this;
    },
  });

  const obj2 = o.get("abc"); // obj
  obj2.a = 4;
  obj2.b = 5;
  console.log(o.get("a"));
  console.log(o.get("b"));
}

// 如何去避免修改obj

// solve 1

{
  const o = (function () {
    const obj = {
      a: 1,
      b: 2,
    };
    return {
      get: function (k) {
        if (obj.hasOwnProperty(k)) {
          return obj[k];
        }
        return undefined;
      },
    };
  })();

  Object.defineProperty(Object.prototype, "abc", {
    get: function () {
      return this;
    },
  });

  const obj2 = o.get("abc"); // undefined
  obj2.a = 4; // error
  obj2.b = 5; // error
  console.log(o.get("a"));
  console.log(o.get("b"));
}

// solve 2
{
  const o = (function () {
    const obj = {
      a: 1,
      b: 2,
    };
    Object.setPrototypeOf(obj, null);
    return {
      get: function (k) {
        return obj[k];
      },
    };
  })();

  Object.defineProperty(Object.prototype, "abc", {
    get: function () {
      return this;
    },
  });

  const obj2 = o.get("abc"); // undefined
  obj2.a = 4; // error
  obj2.b = 5; // error
  console.log(o.get("a"));
  console.log(o.get("b"));
}


{
  const  o = (function() {
    const obj = {
      a: 1,
      b: 2,
    };
    Object.setPrototypeOf(obj, null);
    return {
      get: function(key) {
        if (obj.hasOwnProperty(key)) {
          return obj[key];
        }
        return void 0;
      }
    }
  })();

  o.get('a');
}
