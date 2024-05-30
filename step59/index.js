class Schedule {
  #running = false;
  #task;
  #resolve;
  #duration;

  constructor(task, callback) {
    this.#task = task;
    this.#resolve = callback;
  }

  start(duration = 1000) {
    if (this.#running) return;
    this.#running = true;
    this.#duration = duration;
    this.#run();
  }

  stop() {
    this.#running = false;
  }

  async #run() {
    if (!this.#running) return;
    try {
      const result = await this.#task();
      this.#resolve(result);
    } catch (e) {
      this.#resolve(e);
    } finally {
      await this.#sleep();
      await this.#run();
    }
  }

  #sleep() {
    return new Promise((resolve) => setTimeout(resolve, this.#duration));
  }
}
let count = 0;
const task = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      count++;
      resolve(count);
    }, 1000)
  );

const schedule = new Schedule(task, (res) => {
  console.log("执行了" + res + "次");
});

schedule.start(1000);

setTimeout(() => {
  schedule.stop();
}, 9000);
