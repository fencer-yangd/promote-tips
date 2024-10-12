const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  #state = PENDING;
  #result = void 0;
  #handler = [];
  constructor(executor) {
    this.#state = "pending";
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  #changeState(state, result) {
    this.#state = state;
    this.#result = result;
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handler.length) {
      const { onFulfilled, onReject, resolve, reject } = this.#handler.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      }
      if (this.#state === REJECTED) {
        this.#runOne(onReject, resolve, reject);
      }
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.result);
        return;
      }
      try {
        const result = callback(this.#result);
        if (this.#isPromiseLike(result)) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  #isPromiseLike(data) {
    if (
      (data !== null && typeof data === "object") ||
      typeof data === "function"
    ) {
      return typeof data.then === "function";
    }
    return false;
  }

  #runMicroTask(callback) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(callback);
    } else if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(callback);
      const textNode = document.createTextNode("1");
      observer.observe(textNode, {
        characterData: true,
      });
      textNode.data = "2";
    } else {
      setTimeout(callback, 0);
    }
  }

  then(onFulfilled, onReject) {
    return new MyPromise((resolve, reject) => {
      this.#handler.push({
        onFulfilled,
        onReject,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  catch(onRejected) {
    return this.then(void 0, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    let _resolve, _reject;
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    if (p.#isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

MyPromise.resolve(1).then(console.log);

setTimeout(() => {
  console.log(2);
});

console.log(3);
