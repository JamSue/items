
/* 
    函数柯里化：运用js将回调函数作为参数的高阶函数，实现参数复用、延迟执行等作用

    运用到闭包
*/

/*  
    案例1. add
    实现add,不限制入参个数和调用时机，达到参数求和:
        add(1)(2)(3)=6
        add(1,2,3) = 6
        add(1,2)(3) = 6
*/


// 简单实现参数复用
function Add(x) {
    return (y) => x+y 
}
let Add1 = Add(1)
console.log(Add1(5));


function add1() { // 平时写法
    let args = [...arguments]
    return args.reduce((acc, cur) => (acc+cur),0)
}
console.log(add1(1,2,4,5));


function add2() {
    let args = [...arguments]

    let inner = function () {
        args.push(...arguments)
        return inner
    }

    inner.toString = function () {
        return args.reduce((acc,cur)=>(acc+cur),0)
    }
    return inner
}
console.log(add2(1)(2)(3));

function add(...args) {
    // let args = [...arguments]
    sum= (...newArgs)=>add(...args,...newArgs)
    // let sum = args.reduce((acc, cur) => (acc + cur), 0)
    sum.valueOf =()=> args.reduce((acc, cur) => acc+cur, 0)
    return sum
}

console.log(+add(1)(2)(5)); //使用运算符，调用到了valueOf方法


function currying(func) {
    let len = func.length; //func参数形参的数量,返回未赋值的默认形参。...args不算数
    return _currying.call(this, func, len);
}

function _currying(func, len = func.length, ...args) {
    return function fn() {
    let _args = [...args, ...arguments]; //收集参数
    if (_args.length >= len) {
    //如果参数数量已经达到,就返回结果
    return func.apply(this, _args);
     } else {
     //否则继续递归
     return _currying.call(this, func, len, ..._args);
     }
 };
}

// function f(a,b,c,d) {
//     console.log('arg',arguments);
//     console.log('arg1',[].slice.call(arguments,1));
    
// }
// console.log(f(1,2,3,4));
// console.log(f.length);
