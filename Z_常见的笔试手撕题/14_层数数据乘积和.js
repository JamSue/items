/* 
题目：一个字符串中只包含字符数字，'('，')'，','几种字符，例如：“4,(2,(3,1),(5,(3)))”表示4在第0层，
2在第一层，315在第二层，3在第三层，输出结果为每个元素与所在层数的乘积和。 
例： input：“100,(1,(8),(1))”， output: 19 解释：0x100 + 1x1 + 2x8 + 2x1 = 19
*/

function getLevelProduct(str) {
    let res = 0
    let level = 0
    let cur = '' // 收集当前数字
    for (s of str) {
        if (s === '(' || s === ')' || s === ',') {
            res = cur==='' ? res : (res+ parseInt(cur) * level)
            cur = ''
            level = ( s==='(' ) ? (level+1) : level
            level = ( s===')' ) ? (level-1) : level
        } else {
            cur += s
       }
    }
    return res
}
let str = "4,(2,(3,1),(5,(3)))"
// let str = "100,(1,(8),(1))"
console.log(getLevelProduct(str));
