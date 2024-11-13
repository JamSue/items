/* 
    1. bind的用法
*/

let obj1 = {
    name: 'llp',
    age:18
}

let obj2 = {
    name: 'sh',
    age:3
}

function speak(val) {
    console.log(val);
    console.log(this.name);
}

// speak(1)

// const obj1Speak = speak.bind(obj1, 2)
// obj1Speak()


/* 
     2.bind的实现，构造函数bind的使用情况
     传入的context是需要新指向的位置
*/

Function.prototype.bind2 = function (context) {
    var _this = this // 需要修改this指向的函数
    let arg = [...arguments].slice(1) // 传入的参数构成的数组
    
    
    return function () {
        _this.apply(context,arg)
    }
    
}
console.log('测试',speak.bind2(obj1,1,2,3));



// function bind(context, ...args) {
//     var fn = this
//     if (typeof fn !== "function") {
//         throw new TypeError('this is not a Function')
//     }

//     function F() {
//         if (fn instanceof F) {
//             return new fn(...args,...arguments)
//         } else {
//             return fn.apply(context,...args,...arguments)
//         }
//     }

//     let newF = function () {
        
//     }

//     newF.prototype = this.prototype
//     F.prototype = new newF()
    
//     return F
// }