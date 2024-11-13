class Scheduler{
    taskQueue = []
    maxTaskNum = 2 // 最大执行任务数
    curCount = 0 // 当前正在执行的任务数
    
    add(F) {
        //将任务(返回 Promise 的函数)添加到队列中。
       this.taskQueue.push(F) 
    }

    request() {
        if (this.curCount >= this.maxTaskNum || this.taskQueue.length <= 0) return
        else {
            const task = this.taskQueue.shift()
            this.curCount++
            task().finally(() => {
                this.curCount--
                this.request()
            })
            this.request()
        }
    }
    taskStart() {
        // 启动任务执行，使得最多有指定数量的任务并行执行
        console.log('task Start......');
        this.request()
    }
}
const timeout =(time)=>new Promise((resolve)=>setTimeout(resolve, time));
const scheduler =new Scheduler();
const addTask=(time,order)=>{
scheduler.add(()=>timeout(time).then(()=>console.log('order',order)));};
addTask(1000,'1');
addTask(500,'2');
addTask(300,'3');
addTask(400,'4');
scheduler.taskStart();


/* 
// 同时发1000个请求怎么优化

编写一个JavaScript 类 5cheduler 来管理一个异步任务队列，要求限制并行任务的最大数量。调度器需满足以下要求:
1.并发限制:同一时间最多只能有设定数量(例如2个)任务并行执行
2.队列管理:新任务按添加顺序进入队列，并依次执行。
请实现 Scheduler 类，并包含以下方法:
add:将任务(返回 Promise 的函数)添加到队列中。
request:从队列中取出下一个可执行的任务，开始执行，直到达到并发限制。
taskStart:启动任务执行，使得最多有指定数量的任务并行执行。

完成实现后，使用以下代码进行测试:

const timeout =(time)=>new Promise((resolve)=>setTimeout(resolve, time));
const scheduler =new Scheduler();
const addTask=(time,order)=>{
scheduler.add(()=>timeout(time).then(()=>console.log(order)));};
addTask(1000，'1');//任务1耗时1000毫
addTask(500，'2’);// 任务2耗时500毫秒
addTask(300，'3');//任务3耗时300毫秒
addTask(400，'4');//任务4耗时400毫秒
scheduler.taskStart();
预期输出:2314
解释:
1.任务2(500 ms)和任务 3(300 ms)会最先运行。
2.任务 3 先完成，所以任务 1随后开始。
3.当任务 2 完成时，任务 4 开始执行。
4.最终输出顺序为:2314。
*/