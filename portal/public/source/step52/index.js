/**
 * 如何消除异步传染？
 */

/**
 *
 * 将下面的代码消除异步的副作用
 * async function getUser() {
 *   const res = await fetch('./1.json').json();
 *   return res;
 * }
 *
 * async function a() {
 *   const res = await getUser();
 *   return res;
 * }
 *
 * async function b() {
 *   const res = await a();
 *   return res;
 * }
 *
 * async function main() {
 *   const res = await b();
 *   console.log(res);
 * }
 *
 * main();
 *
 *
 */

function getUser() {
  const res = fetch('./1.json');
  return res;
}

function a() {
  const res = getUser();
  return res;
}

function b() {
  const res = a();
  return res;
}

function main() {
  const res = b();
  console.log(res);
  document.querySelector('#result').innerText = JSON.stringify(res, null, 2);
}

function run(func) {
  // 1. 缓存 fetch 函数
  const oldFetch = window.fetch;
  // 2. 判断是否存在缓存
  const cache = {
    status: 'pending', // pending, fulfilled, rejected
    value: null,
  }
  // 3. 重写 fetch 函数
  const newFetch = (...args) => {
    if (cache.status === 'fulfilled') {
      return cache.value;
    }
    if (cache.status === 'rejected') {
      throw cache.value;
    }
    if (cache.status === 'pending') {
      throw oldFetch(...args).then(res => res.json()).then(res => {
        cache.value = res;
        cache.status = 'fulfilled';
      }, (e) => {
        cache.value = e;
        cache.status = 'rejected';
      })
    }
  }

  // 4. 执行函数
  try {
    window.fetch = newFetch;
    func();
    window.fetch = oldFetch;
  } catch (e) {
    if (e instanceof Promise) {
      e.then(() => {
        window.fetch = newFetch;
        func();
        window.fetch = oldFetch;
      });
    }
  }

  // 5. 还原 fetch 函数
  window.fetch = oldFetch;
}

run(main);
