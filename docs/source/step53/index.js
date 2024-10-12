/**
 * 有n个任务需要进行
 *  1：依次执行，如果中途报错就停止
 *  2：可以暂停任务
 *  3：暂停之后可以继续开始任务
 *  4：每个任务不能被中断，如果中断流程的途中，有任务在进行，需要等待当前任务执行结束才执行暂停
 */
const readline = require('readline');
const sleep = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const tasks = new Array(10).fill(() => sleep(2000));

function processTasks(tasks) {
  let running = false;
  let result = [];
  let i = 0;
  let promise = null;
  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (promise) return promise.then(resolve, reject);
        if (running) return;
        console.log('开始执行');
        running = true;
        while (i < tasks.length) {
          try {
            console.log('开始执行', i + 1);
            result.push(await tasks[i]());
            console.log('执行结束', i + 1);
          } catch (err) {
            console.log('执行出错', i + 1);
            reject(err);
            promise = Promise.reject(err);
            return;
          }
          i++;
          if(!running && i < tasks.length - 1) return;
        }
        resolve(result);
        promise = Promise.resolve(result);
        if (i >= tasks.length) process.exit();
      })

    },
    pause() {
      console.log('执行中断');
      console.log('按s键重新开始任务');
      running = false;
    },
  }
}

const _process = processTasks(tasks);
console.log('按s键开始任务');


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.name === 'p') {
    _process.pause();
  }
  if (key.name === 's') {
    _process.start().then(console.log, process.exit);
  }
});