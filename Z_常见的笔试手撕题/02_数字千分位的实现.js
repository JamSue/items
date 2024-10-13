let num = 12345678933

function get(num) {
    let count = 0
    let res = ''
    for (let i = num.toString().length - 1; i >= 0; i--){
        if (count === 3) {
            res = res + ',' 
            count=0
        } 
        res = res + num.toString()[i]
        count++
        
    }
   
    console.log((res.split('')).reverse().join(''));
    
}
get(num)


// 正则方法
function formatNumber(num) {
    // 将数字转换为字符串，并使用正则表达式添加千分位分隔符
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}