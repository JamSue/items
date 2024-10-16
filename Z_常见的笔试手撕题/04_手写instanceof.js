
// 利用原型链： data.__proto__ = type.prototype
/* 
// ###原型链理解示例###

let a = 12
let b = 'hellp'
console.log(b.__proto__===String.prototype); // 自动装箱
console.log(null instanceof Number);
console.log(a instanceof Number);
console.log(b instanceof String);
c = NaN
console.log(!c);
console.log(Object.getPrototypeOf(a)); // 自动装箱

function F() {
    
}
let f = new F()
console.log(f.__proto__ === F.prototype);
console.log(f.__proto__.constructor === F.prototype.constructor);
console.log(0 instanceof Number);
console.log(Object.getPrototypeOf(0)===Number.prototype);
 */


function myInstanceof(left, right) {
    // 左边是数据，右边是类型

    if (left === null || left === undefined) return false // 除null和undefined都含有__proto__属性
    // if(!left) return false  // 与上面的代码并不等价

    let proto = Object.getPrototypeOf(left)
    while (proto) {
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
    return false
}
console.log(myInstanceof([1,2],Object));

