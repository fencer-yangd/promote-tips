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

// new LazyMan("Hank").sleep(10).eat("dinner");
// new LazyMan("Hank").eat("dinner").eat("supper");
// new LazyMan("Hank").sleepFirst(5).eat("supper");

const arr = ["a", "b", "c", "d", "e"];

// 回溯算法
function main(arr) {
  if (arr.length === 1) return [arr[0]];
  let res = [];
  for (let i = 0; i < arr.length; ++i) {
    const newArray = [...arr.slice(0, i), ...arr.slice(i + 1)];
    res = res.concat(main(newArray).map((item) => arr[i] + item));
  }
  return res;
}
// 5! = 120,正解
console.log(new Set(main(arr)).size);

function getDeep(tree) {
  if (!tree) return 0;
  const queue = [tree];
  let dep = 0;
  while (queue.length) {
    dep++;
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.children) {
        for (const child of node.children) {
          queue.push(child);
        }
      }
    }
  }

  return dep;
}

const tree = {
  name: "root",
  children: [
    { name: "叶子1-1" },
    { name: "叶子1-2" },
    {
      name: "叶子2-1",
      children: [
        {
          name: "叶子3-1",
          children: [
            {
              name: "叶子4-1",
              children: [{}],
            },
          ],
        },
      ],
    },
  ],
};

console.log(getDeep(tree));
