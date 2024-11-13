/* 
// ### promise理解部分代码 ###
Promise.reject(4).then((val) => {
    console.log(val);
    return 
    
}, (val) => {
    console.log('e');
    
    throw new Error('err message')
    
}).catch(err => {
    console.log('err:', err);
    
}) */

// 实现promise.allSettled和promise.finally
//#region 
/*----------------------------实现promsie的原理--------------------------------- */
class myPromise{
    status
    value
    errReason
    onFulfilledCallback = []
    onRejectedCallback = []
    constructor(executor) {
        this.status = 'pending'

        try {
            executor(this.resolve,this.rejected)
        } catch (error) {
            rejected(error)
        }
    }
    resolve = (val) => {
        // 改变promise的状态
        if (this.status === 'pending') { // this指向promise
            this.status = 'fulfilled'
            this.value = val
            while (this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()()
            }
        }
    }

    rejected = (reason) => {
        if (this.status === 'pending') {
            this.status = 'rejected'
            this.errReason = reason
            while (this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(this.errReason)
            }
        }
    }
    allSettled(iterator) {
        // 返回一个promise 当所有promise执行完毕后状态转为fulfilled,并返回一个对象数组，对象包含每个promise的{status, value/reason}
        let p = new myPromise(() => {
            
        })
    }
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
    let that = this
    let p = new myPromise((resolve, reject) => {
        if (that.status === 'fulfilled') {
            let res = onFulfilled(that.value)
            resolve(res) // 改变返回的promise的状态
    }
        if (that.status === 'rejected') {
            let res = onRejected(that.errReason)
            resolve(res)
        }
        if (that.status === 'pending') {
            that.onFulfilledCallback.push(function () {
                let res = onFulfilled(that.value)
                resolve(res)
            })
            that.onRejectedCallback.push(function () {
                let res = onRejected(that.errReason)
                resolve(res)
            })
        }
    })
    return p
}

myPromise.prototype.catch = function (callback) {
    return this.then(()=>{}, callback)
}

myPromise.prototype.all = function (arr) {
    
}
myPromise.prototype.finally = function (callback) {
    // promise执行完成后(fulfilled/rejected)，都要执行finally中的回调
}
const promise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
//     return promise
// }).then(() => {
//     console.log('1123');
// })
//#endregion


/* ----------------------------------------promise的重新实现--------------------------------------------------------- */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class newPromise{

  constructor(executor) { // constructor的this指向总是指向正在被创建的类实例

    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallback = []
    this.onRejectedCallback = []
    // (1)为什么需要这两个回调栈

    const resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = val
        onFulfilledCallback.forEach(f => {
          f(this.value)
        });
      }
    }
    const rejected = (message) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = message
        onRejectedCallback.forEach(fn => {
          fn(this.reason)
        })
      }
    }
    // (2)为什么使用箭头函数和const,以及constructor内部函数与静态函数和实例函数的区别
    try {
      executor(resolve,rejected)
    } catch (error) {
      rejected(error)
    }

  }
  then(onFulfilled, onRejected) {
    //#region
    /* ```
    then的作用是：当promise已经settle,执行对应的回调函数
    实现：
    (1)判断then的传参是否为函数，如果不是函数的话,then会自动使用默认回调。所以传入的非函数参数没有意义
    (2)then需要实现链式调用，因此在then中返回的是一个新的Promise,并且将上一个Promise中成功/失败回调得到的结果传给新的Promise中
    (3)then中将回调函数推入微任务队列中，在当前执行回调栈中的代码执行完成后会自动执行微任务中的函数
    ``` */
    // (3)如果在传入的回调不为函数时，(value)=>value 此处的value为啥还能接收到promise返回的值
    //    但是如果直接打印value，则会报错 =>因为在resolve或者reject中传递的参数，在这以形参接收
    //    console.log(value); // ReferenceError: value is not defined
    //#endregion
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { 
      reason = (reason instanceof Error) ? reason.message : reason
      return reason
    } 
    let self = this
    let promise2 = new newPromise((resolve, reject) => {
      const fulfilledMicroTask = () => {
        // 创建微任务执行成功回调，将成功回调函数执行的结果返回给promise2
        queueMicrotask(() => {
          try {
            const x = onFulfilled(self.value) // (4) 这边传入的value又是哪个value=>调用then函数promise对应的value
            resolve(x) // 此处需要对x进行一些判断和处理,将x传到下一个promise
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicroTask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(self.reason) // 执行的是拒绝的回调也是需要将回调函数执行成功的值传给下个promise的resolve
            resolve(x)
          } catch (error) {
            reject(error)
          }
        })
      }
      // 上一个promise settle之后，将回调函数推入微任务队列中，并将执行结果返回到当前promise
      if (self.status === FULFILLED) {
        fulfilledMicroTask()
      }
      else if (self.status === REJECTED) {
        rejectedMicroTask()
      } else if (self.status === PENDING) {
        this.onFulfilledCallback.push(fulfilledMicroTask)
        this.onRejectedCallback.push(rejectedMicroTask)
      }
    })

    return promise2 // 返回一个新的Promise实现链式调用
  }
  
  catch(onRejected) { 
    return this.then(null, onRejected) // 这边的成功回调传入空函数、undefined、null的区别，以及为啥要传
  }

  finally(callback) {
    // promise状态settled之后，执行callback函数
    //返回一个promise与与上一个promise状态保持一致
    return this.then((val) => {
      // 也可以通过this.constructor.resolve访问类的静态函数
      return newPromise.resolve(callback()).then(()=>val)
    }, (reason) => {
      return newPromise.resolve(callback()).then(()=>{throw reason})
    })
  }
  static resolve(x) {
    // 将现有对象转换成promise对象
    if (x instanceof newPromise) return x
    else return new newPromise(resolve => resolve(x))
  }
  static reject(reason) {
    // 返回一个状态为reject的promise
    return new newPromise((resolve, reject) => {reject(reason)})
  }
}
let p = new newPromise((resolve,reject) => {
    console.log('promise创建成功');
    resolve('666')
})
p.then(() => {
  console.log(11);
  
}).catch().finally(() => {
  console.log('end');
  
})

// let p = new Promise((resolve, reject) => {
//   console.log('resolve and reject');
//   resolve('success')
// })
// p.then(1,2)
// p.then(() => {
//   console.log('第一层层');
  
// }, () => { }).catch(() => {
//   console.log('err');
  
// }).finally(() => {
//   console.log('服务终止');
//   return 8
// }).then((val) => {
//   console.log('val',val);
  
// })

// let e = new Error('err')

// console.log(typeof e);
// console.log(e instanceof Error);

/* 
resolvePromise 函数的作用是将回调结果 x 传递给下一个 Promise，即 promise2。这是 Promise 链式调用的重要机制：

resolvePromise 会分析 x 的类型，如果 x 是一个普通值，则直接将 x 作为 promise2 的 fulfilled 值。
如果 x 是一个 Promise 对象，promise2 会等待 x 的状态。
resolvePromise 函数的详细实现通常较复杂，因为它要符合 Promise 的行为规范（例如需要考虑循环引用的情况）。
*/