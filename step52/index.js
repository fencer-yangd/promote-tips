/**
 * 如何消除异步传染？
 */

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const _global = {};
// 模拟window fetch
_global.fetch = async (status) => {
  if (status) {
    await sleep(1000);
    return Promise.resolve("success");
  }
  await sleep(1000);
  return Promise.reject("error");
};

// 以下是主流程代码模块
{
  async function a(status) {
    // other code
    return await _global.fetch(status);
  }

  async function b(status) {
    // other work
    return await a(status);
  }

  function main() {
    const c = b(true);
    console.log(c);
  }

  main();
}

// 解决方案: 使得主流程代码模块不出现异步，并且能正确拿到结果

{
  function a(status) {
    // other code
    return _global.fetch(status);
  }

  function b(status) {
    // other work
    return a(status);
  }

  function main() {
    const c = b(true);
    console.log(c);
  }

  const run = (func) => {
    let cache = [];
    let i = 0;
    const _oldFetch = _global.fetch;
    _global.fetch = (...args) => {
      if (cache[i]) {
        if (cache[i].status === "fulfilled") {
          return cache[i].data;
        }
        if (cache[i].status === "rejected") {
          throw cache[i].err;
        }
      }
      const result = {
        status: "pending",
        data: null,
        err: null,
      };
      cache[i++] = result;
      throw _oldFetch(...args).then(
        (res) => {
          result.status = "fulfilled";
          result.data = res;
        },
        (err) => {
          result.status = "rejected";
          result.err = err;
        }
      );
    };

    try {
      func();
    } catch (err) {
      if (err instanceof Promise) {
        const reRun = () => {
          i = 0;
          func();
        };
        err.then(reRun, reRun);
      }
    }
  };

  run(main);
}
