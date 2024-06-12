const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


/**
 *
 * add() 0
 *  add(1) function
 *  add(1)(2)()  3
 *  add(1)(2)(3)() Number.Max_Value error
 *
 */
function add() {
  let store = 0;
  if(!arguments.length) return 0;
  if (arguments[0] - Number.MAX_VALUE > 0) throw new SQLException();
  store += arguments[0];
  return function () {
    if (!arguments.length) return store;
    if (store - Number.MAX_VALUE > 0) throw new SQLException();
    store += arguments[0];
    return arguments.callee;
  }
}


// Promise.allSettled

class MyPromise {
  #status;
  #handler;
  #data;

  constructor(executor) {
    this.#status = PENDING;
    this.#handler = [];
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (e) {
      this.#reject();
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#addHandler(onFulfilled, FULFILLED, resolve, reject);
      this.#addHandler(onRejected, REJECTED, resolve, reject);
      this.#runHandler();
    })
  }

  #runHandler() {
    while (this.#handler.length > 0) {
      this.#runOneHandler(this.#handler.shift());
    }
  }

  #runOneHandler(handler) {
    if (this.#status === handler.status) {
      this.#runMicroTask(() => handler.executor(this.#data));
      if (this.#status === FULFILLED) {
        handler.resolve(this.#data);
      }
      if (this.#status === REJECTED) {
        handler.reject(this.#data);
      }
    }
  }

  #runMicroTask(callback) {
    if (process.nextTick) {
      process.nextTick(callback);
    } else if (MutationObserver) {
      const observer = new MutationObserver(callback);
      const p = document.createElement('p');
      observer.observe(p, { childList: true });
      p.innerHTML = '1';
    } else {
      setTimeout(callback);
    }
  }

  #addHandler(executor, status, resolve, reject) {
    this.#handler.push({executor, status, resolve, reject});
  }

  #resolve(data) {
    this.#changeStatus(FULFILLED, data);
  }

  #reject() {
    this.#changeStatus(REJECTED, data);
  }

  #changeStatus(status, data) {
    if (this.#status === PENDING) return;
    this.#status = status;
    this.#data = data;
    this.#runHandler();
  }
}
