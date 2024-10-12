class LazyMan {
  #taskQueue = [];
  /**
   * 构造函数
   * @param { string } name
   */
  constructor(name) {
    this.#taskQueue = []; // 任务队列
    this.sayHi(name);
    setTimeout(this.#run.bind(this), 0);
  }

  sayHi(name) {
    this.#taskQueue.push(() => console.log(`Hi I am ${name}`));
    return this;
  }

  eat(name) {
    this.#taskQueue.push(() => console.log(`Eat ${name} ~`));
    return this;
  }

  /**
   * 睡觉
   * @param { number } time
   */
  sleep(time) {
    this.#taskQueue.push(this.#sleep(time));
    return this;
  }

  /**
   * 首先睡觉
   * @param { number } time
   */
  sleepFirst(time) {
    this.#taskQueue.unshift(this.#sleep(time));
    return this;
  }

  async #run() {
    while (this.#taskQueue.length) {
      const task = this.#taskQueue.shift();
      task();
    }
  }

  /**
   * 睡觉函数
   * @param { number } time
   */
  #sleep(time) {
    return () => {
      console.log(`Wake up after ${time}s`);
      const start = new Date().getTime();
      while (start + time * 1000 > new Date().getTime());
    };
  }
}

new LazyMan("Hank").sleep(10).eat("dinner");
new LazyMan("Hank").eat("dinner").eat("supper");
new LazyMan("Hank").sleepFirst(5).eat("supper");
