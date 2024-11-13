

// class TaskScheduler{

//   maxconcurrent // 最大任务量
//   entries = [ // 任务优先级队列
//         [0,[]],
//         [1,[]],
//         [2,[]],
//         [3,[]],
//         [4,[]],
//         [5,[]],
//         [6,[]],
//         [7,[]],
//         [8,[]],
//         [9,[]]
//       ]
//   taskMap = new Map(this.entries)// 任务队列,不同优先级对应一个任务数组
//   events = { // 可被监听的事件
      
//     }
  
  
//   constructor({maxconcurrent=5}) {
//     this.maxconcurrent = maxconcurrent
//     this.queue = []
//     this.activateTasks = 0 // 正在运行的任务
//     this.listeners = {} // 监听器
//   }
  
//   on(event, callback) {
//     if (!this.listeners[event]) {
//         this.listeners[event] = []
//     }
//     this.listeners[event].push(callback)
//   }
//   emit(event,data,...args) {
//     if (this.listeners[event]) {
//         this.listeners[event].forEach(callback => {
//           callback(data,...args)
//         });
//       }
//     }

//   addTask(task) {
//     // 添加任务到调度器的任务队列中
//     const taskData = {
//       ...task,
//       status: 'pending',
//       retriesLeft: task.retry.times,
//       retryInterval: task.retry.interval
//     }
//     this.queue.push(taskData)
//     this.queue.sort((a, b) => b.priority - a.priority)
//     this.emit('taskAdded',taskData)
//   }
  
//   start() {
//     // 启动任务调度

//   }
//   pause() {
//     // 暂停任务执行
//   }
//   resume() {
//   // 恢复任务执行
// }
//   cancelTask() {
//   // 取消指定任务
// }
//   getStats() {
//   // 获取所有任务的执行统计信息
// }
// }

// // 创建 TaskScheduler 实例
// const scheduler = new TaskScheduler({ maxConcurrent: 3 });

// // 定义一些模拟任务
// const createTask = (id, duration, shouldFail = false) => ({
//   id,
//   execute: () =>
//     new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (shouldFail) {
//           reject(new Error(`Task ${id} failed`));
//         } else {
//           resolve(`Task ${id} completed`);
//         }
//       }, duration);
//     }),
//   priority: Math.floor(Math.random() * 10), // 随机优先级 0-9
//   retry: { times: 2, interval: 1000 }
// });

// // 添加事件监听器
// scheduler.on('taskAdded', (task) => console.log(`Task added: ${task.id}`));
// scheduler.on('taskStart', (task) => console.log(`Task started: ${task.id}`));
// scheduler.on('taskComplete', (task, result) =>console.log(`Task completed: ${task.id}, Result: ${result}`)
// );
// scheduler.on('taskFail', (task, error) =>
//   console.log(`Task failed: ${task.id}, Error: ${error.message}`)
// );
// scheduler.on('taskCancel', (task) => console.log(`Task cancelled: ${task.id}`));

// // 添加任务
// scheduler.addTask(createTask('A', 2000));
// scheduler.addTask(createTask('B', 1000));
// scheduler.addTask(createTask('C', 3000));
// scheduler.addTask(createTask('D', 1500, true)); // 这个任务会失败
// scheduler.addTask(createTask('E', 2500));

// // 开始执行任务
// scheduler.start();

// // 取消一个任务
// setTimeout(() => scheduler.cancelTask('E'), 1000);

// // 暂停调度器
// setTimeout(() => {
//   console.log('Pausing scheduler');
//   scheduler.pause();
// }, 5000);

// // 恢复调度器
// setTimeout(() => {
//   console.log('Resuming scheduler');
//   scheduler.resume();
// }, 7000);

// // 在所有任务完成后打印统计信息
// setTimeout(() => {
//   const stats = scheduler.getStats();
//   console.log('Final stats:', stats);
// }, 15000);

/* 
题目:实现一个具有并发限制和任务优先级的任务调度器
编写一个JavaScript 类 Taskscheduler 来管理一组异步任务，并满足以下需求:
1.并发限制:在任何时刻，最多只能有 maxconcurrent 数量的任务同时执行
2.任务优先级:每个任务具有0到9的优先级，调度器优先执行优先级高的任务
3.任务失败重试:任务若失败，可按照设定的重试次数和间隔时间自动重试。// 重试次数：每个任务有不同的重试次数和间隔时间？ 还是每个调度器有自己的重试次数和间隔时间
4.任务控制:实现任务的启动、暂停、恢复、取消功能。
5.事件监听:调度器可以监听任务的以下事件:
taskAdded:任务被添加
taskstart:任务开始
taskComplete:任务完成
taskFail:任务失败
taskcancel:任务被取消
要求方法
实现 TaskScheduler 类并包含以下主要方法
。addTask:添加任务到调度器的任务队列中。
start:启动任务调度。
pause:暂停任务执行。
resume:恢复任务执行。
cancelTask:取消指定任务，
getStats:获取所有任务的执行统计信息
*/


class TaskScheduler {
    constructor({ maxConcurrent = 3 }) {
        this.maxConcurrent = maxConcurrent;
        this.queue = [];
        this.activeTasks = 0;
        this.isPaused = false;
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event, data, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data, ...args));
        }
    }

    addTask(task) {
        const taskWithMetadata = {
            ...task,
            status: 'pending',
            retriesLeft: task.retry.times,
            retryInterval: task.retry.interval
        };
        this.queue.push(taskWithMetadata);
        this.queue.sort((a, b) => b.priority - a.priority);
        this.emit('taskAdded', taskWithMetadata);
        this.runNextTask();
    }

    runNextTask() {
        if (this.isPaused || this.activeTasks >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }

        const task = this.queue.shift();
        this.activeTasks++;
        task.status = 'running';
        this.emit('taskStart', task);

        const attempt = (retriesLeft) => {
            task.execute()
                .then((result) => {
                    task.status = 'complete';
                    this.emit('taskComplete', task, result);
                    this.activeTasks--;
                    this.runNextTask();
                })
                .catch((error) => {
                    if (retriesLeft > 0) {
                        setTimeout(() => attempt(retriesLeft - 1), task.retryInterval);
                    } else {
                        task.status = 'failed';
                        this.emit('taskFail', task, error);
                        this.activeTasks--;
                        this.runNextTask();
                    }
                });
        };

        attempt(task.retriesLeft);
    }

    start() {
        this.isPaused = false;
        this.runNextTask();
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.start();
    }

    cancelTask(taskId) {
        const index = this.queue.findIndex(task => task.id === taskId);
        if (index !== -1) {
            const [task] = this.queue.splice(index, 1);
            task.status = 'cancelled';
            this.emit('taskCancel', task);
        }
    }

    getStats() {
        const stats = {
            total: 0,
            complete: 0,
            failed: 0,
            cancelled: 0,
            pending: 0,
            running: 0,
        };

        [stats.complete, stats.failed, stats.cancelled, stats.pending, stats.running] = 
            this.queue.reduce((acc, task) => {
                acc[task.status]++;
                acc.total++;
                return acc;
            }, { complete: 0, failed: 0, cancelled: 0, pending: 0, running: 0 });

        return stats;
    }
}

// 实例化调度器
const scheduler = new TaskScheduler({ maxConcurrent: 3 });

// 定义一些模拟任务
const createTask = (id, duration, shouldFail = false) => ({
    id,
    execute: () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`Task ${id} failed`));
                } else {
                    resolve(`Task ${id} completed`);
                }
            }, duration);
        }),
    priority: Math.floor(Math.random() * 10), // 随机优先级 0-9
    retry: { times: 2, interval: 1000 }
});

// 添加事件监听器
scheduler.on('taskAdded', (task) => console.log(`Task added: ${task.id}`));
scheduler.on('taskStart', (task) => console.log(`Task started: ${task.id}`));
scheduler.on('taskComplete', (task, result) =>
    console.log(`Task completed: ${task.id}, Result: ${result}`)
);
scheduler.on('taskFail', (task, error) =>
    console.log(`Task failed: ${task.id}, Error: ${error.message}`)
);
scheduler.on('taskCancel', (task) => console.log(`Task cancelled: ${task.id}`));

// 添加任务
scheduler.addTask(createTask('A', 2000));
scheduler.addTask(createTask('B', 1000));
scheduler.addTask(createTask('C', 3000));
scheduler.addTask(createTask('D', 1500, true)); // 这个任务会失败
scheduler.addTask(createTask('E', 2500));

// 开始执行任务
scheduler.start();

// 取消一个任务
setTimeout(() => scheduler.cancelTask('E'), 1000);

// 暂停调度器
setTimeout(() => {
    console.log('Pausing scheduler');
    scheduler.pause();
}, 5000);

// 恢复调度器
setTimeout(() => {
    console.log('Resuming scheduler');
    scheduler.resume();
}, 7000);

// 在所有任务完成后打印统计信息
setTimeout(() => {
    const stats = scheduler.getStats();
    console.log('Final stats:', stats);
}, 15000);
