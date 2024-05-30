enum Status {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

interface Handler<T, R> {
  executor: (data: T | R) => void;
  state: Status.Fulfilled | Status.Rejected;
  resolve: (data: T) => void;
  reject: (reason: R) => void;
}

class MyPromise<T, R extends T> {
  #status: Status;
  #data: T | R;
  readonly #handlers: Handler<T, R>[] = [];
  /**
   *
   * @param executor 立即执行函数
   */
  constructor(executor) {
    this.#status = Status.Pending;
    this.#handlers = [];
    try {
      executor(this.#resolve.bind(this), this.#reject.bind(this));
    } catch(e) {
      this.#reject(e);
    }
  }

  /**
   * @description 添加队列函数
   * @param executor
   * @param state
   * @param resolve
   * @param reject
   * @private
   */
  #addHandler(executor: (data: T | R) => void, state: Status.Fulfilled | Status.Rejected, resolve: (data: T) => void, reject: (reason: R) => void) {
    this.#handlers.push({ executor, state, resolve, reject })
  }

  /**
   * @description 执行队列
   * @private
   */
  #runHandler() {
    if (this.#status === Status.Pending) return;
    while (this.#handlers[0]) {
      this.#runOneHandler(this.#handlers[0]);
      this.#handlers.shift();
    }
  }

  #runOneHandler(handler: Handler<T, R>) {
    if (this.#status === handler.state) {
      this.#runMicroTask(() => handler.executor(this.#data));
      if (this.#status === Status.Fulfilled) {
        handler.resolve(this.#data)
      } else if (this.#status === Status.Rejected) {
        handler.reject(this.#data as R);
      }
    }
  }

  then(onFulfilled?: (value: T) => void, onRejected?: (reason: R) => void) {
    return new MyPromise((resolve, reject) => {
      this.#addHandler(onFulfilled, Status.Fulfilled, resolve, reject);
      this.#addHandler(onRejected, Status.Rejected, resolve, reject);
      this.#runHandler();
    })
  }

  /**
   * @description run micro task
   * @param callback
   * @private
   */
  #runMicroTask(callback: (data: T | R) => void) {
    if (process && process?.nextTick) {
      process.nextTick(callback);
    } else if (MutationObserver) {
      const p = document.createElement('p');
      const observer = new MutationObserver(callback as MutationCallback);
      observer.observe(p, { childList: true});
      p.innerHTML = '1';
    } else {
      setTimeout(callback);
    }
  }
  
  /**
   * @description 标记当前任务完成
   * @param value
   */
  #resolve(value: T) {
    this.#changeState(Status.Fulfilled, value);
  }

  #changeState(status: Status, value: T) {
    if (this.#status !== Status.Pending) return;
    this.#status = status;
    this.#data = value;
    this.#runHandler();
  }
  
  /**
   * @description 标记当前任务失败
   * @param reason
   */
  #reject(reason: R) {
    this.#changeState(Status.Rejected, reason);
  }
}

new MyPromise((resolve, reject) => {
  resolve(123)
}).then(console.log).then(() => console.log(1234));

setTimeout(() => console.log(222));

console.log(111);