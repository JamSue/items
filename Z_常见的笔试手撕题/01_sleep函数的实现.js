//  sleep():python、java等语言中的api,实现程序暂停执行一段时间后再继续。用于模拟延迟或等待

// promise和setTimeout实现


// function sleep(time) {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve()
//         },time)
//     })
// }

// sleep简化写法
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function f(time) {
    console.log('f函数执行');
    sleep(time).then(() => {
        console.log('f继续执行');
   }) 
}
f(2000)