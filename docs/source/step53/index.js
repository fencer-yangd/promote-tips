/**
 * 有n个任务需要进行
 *  1：依次执行，如果中途报错就停止
 *  2：可以暂停任务
 *  3：暂停之后可以继续开始任务
 *  4：每个任务不能被中断，如果中断流程的途中，有任务在进行，需要等待当前任务执行结束才执行暂停
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const DEFAULT = 'default';

const RUNNING = 'running';
const STOP = 'stop';
const FINISH = 'finish';

class Schedule {
  #status;
  #unHandler;
  #handler;
  #result;
  #finishCallback;
  #errorCallback;
  #len;

  constructor(tasks, num, callback, errorCallback) {
    this.#result = [];
    this.#status = RUNNING;
    this.#len = tasks.length;
    this.#handler = tasks.slice(0, num).map((item, idx) => ({ task: item, idx, status: PENDING }));
    this.#unHandler = task.slice(num).map((item, idx) => ({ task: item, idx: num + idx, status: DEFAULT }));
    this.#finishCallback = callback;
    this.#errorCallback = errorCallback;
  }

  start() {
    this.#runHandler();
  }

  #runHandler() {
    if (this.#status !== RUNNING) return;
    while (this.#handler.length) {
      this.#runOneHandler(this.#handler.shift());
    }
  }

  async #runOneHandler(handler) {
    try {
      const data = await handler.task();
      this.#result[handler.idx] = {
        data,
        status: FULFILLED,
      }
      handler.status = FULFILLED;
      if (this.#checkFinish()) {
        this.#status = FINISH;
        this.#finish();
      } else {
        if (this.#unHandler.length) {
          this.#handler.push(this.#unHandler.shift());
          this.#runHandler();
        }
      }
    } catch(e) {
      handler.status = REJECTED;
      this.#status = STOP;
      this.#errorCallback(e);
    }
  }

  #finish() {
    this.#finishCallback(this.#result.map(item => item.data));
  }

  #checkFinish() {
    const unHandlerEmpty = !this.#unHandler.length;
    const handlerEmpty = !this.#handler.length;
    const allFinish = new Array(this.#len).fill(0).every((_, idx) => this.#result[idx]?.status === FULFILLED);

    return unHandlerEmpty && handlerEmpty && allFinish;
  }
}

const task = [];
const scheduler = new Schedule(task, 3);

scheduler.start();

