/**
 * @description 添加promise abort
 */
async function _promise(duration, abort) {
  if (abort.signal.aborted) return Promise.reject(new Error('aborted'));
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() =>{
      if (abort.signal.aborted) return reject(new Error('aborted'));
      console.log('promise is running delay ', duration);
      resolve();
    }, duration);
    abort.signal.addEventListener('abort', e => {
      clearTimeout(timeout);
      reject(e);
    });
  });
  if (abort.signal.aborted) return Promise.reject(new Error('aborted'));
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() =>{
      if (abort.signal.aborted) return reject(new Error('aborted'));
      console.log('promise is running delay ', duration + 1000);
      resolve();
    }, duration + 1000);
    abort.signal.addEventListener('abort', e => {
      clearTimeout(timeout);
      reject(e);
    });
  })
}

const abort1 = new AbortController();
const abort2 = new AbortController();

const promises = [
  {
    promise: _promise(1000, abort1),
    abort: abort1
  },
  {
    promise: _promise(2000, abort2),
    abort: abort2
  },
];

promises.forEach(item => {
  const { promise ,abort } = item;
  promise.then(() => console.log('promise result')).catch(console.error).finally(() => {
    abort.signal.removeEventListener('abort', console.log);
  });
  abort.abort();
})
