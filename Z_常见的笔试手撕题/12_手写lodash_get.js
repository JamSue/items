/* 题目要求：
手写一个 get 函数，支持通过给定的路径（字符串或数组形式）从一个对象中获取值。
如果路径中的某个属性不存在，返回 undefined，如果路径有效，返回该路径的值。
要求：
支持路径传递为字符串（例如 'a.b.c'）或数组（例如 ['a', 'b', 'c']）。
如果路径中的任何一个属性不存在，返回 undefined。
如果路径正确，返回路径对应的值。
不修改原对象，保证函数是纯函数。
*/

function get(obj, path) {
    if (!obj) return undefined
     // 对路径名进行处理，用正则
    if (typeof path === 'string') {
        path =  path.split('.')
    }
    if ((/^[a-zA-Z]+\[\d+\]$/).test(path[0])) {
        s = path[0].match(/^([a-zA-Z]+)\[(\d+)\]$/)[1]
        d = path[0].match(/^([a-zA-Z]+)\[(\d+)\]$/)[2]
        path.splice(0,1,s,d)
        
   }
    if (path.length === 1) {
        return obj.hasOwnProperty(path[0])? obj[path[0]] : undefined
    }
    if (path.length > 1) {
        return get(obj[path[0]],path.slice(1))
    }
}

var object = { 'a': [{ 'b': { 'c': 3 } }] };
console.log(get(object, 'a[0].b.c'));

const obj = {
  a: {
    b: {
      c: 42
    }
  }
};

const obj1 = {
    car: {
        brand: [{
            '奥迪': 1,
            'cvjwhe': 2
        }],
        price: 188
    }
}
console.log(get(obj1,'car.brand'));

console.log(get(obj, 'a.b.c')); // 输出: 42
console.log(get(obj, ['a', 'b', 'c'])); // 输出: 42
console.log(get(obj, 'a.b.d')); // 输出: undefined
console.log(get(obj, 'x.y.z')); // 输出: undefined



// 解法二

function getByPath(obj, path, defaultValue = undefined) {
  //path有数组和字符串两种
  if (typeof path === 'string') {
    //将字符串分割成数组  a[0].c.b => a.0.c.b
    path = path.replace(/\[(\d+)\]/, '.$1').split('.') // 找到[num]格式，用.num替换
  } else if (!Array.isArray(path)) {
    return defaultValue
  }
  let result = obj;
  for (let key of path) {
    result = Object(result)[key];
    if (result == undefined) {
      return defaultValue
    }
  };
  return result
}



// let str = "item[42]value[7]example[900]";
// let result = [...str.matchAll(/\[(\d+)\]/g)].map(match => match[1]);
// console.log(result);
// 输出: ['42', '7', '900']

// function looseJsonParse(obj) {
//   return Function('"use strict";return (' + obj + ")")();
// }
// console.log(looseJsonParse("{a:(4-1), b:function(){}, c:new Date()}"));
