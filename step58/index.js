class Run {
  tasks = [];
  flag = 0;
  constructor(tasks, num) {
    this.tasks = tasks;
    this.num = num;
    this.flag = 0;
  }

  run() {
    if (!this.num) return;
    new Array(this.num).fill(0).forEach(this.runOne.bind(this));
  }

  async runOne() {
    if (!this.tasks.length) return;
    if (this.flag >= this.num) return;
    const task = this.tasks.shift();
    this.flag++;
    await task();
    if (this.flag > 0) this.flag--;
    await this.runOne();
  }
}

const sleep = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log("task " + duration + " done");
      resolve();
    }, duration)
  );

const tasks = new Array(10).fill(() => sleep(1000 + Math.random() * 3000));

const run = new Run(tasks, 2);

run.run();
