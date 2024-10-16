/* 
    实现属性枚举： 
        iphone13-white-64GiB-a1-b1
        iphone13-white-64GiB-a1-b2
        iphone13-white-64GiB-a2-b1
        iphone13-white-64GiB-a2-b2
                ......

*/

const spu = 'iphone13'

const specList = [ 
 ["white", "black","gold"],
 ["64GiB", "128GiB", "256GiB"], 
 ['a1', 'a2'], 
 ['b1', 'b2'],
];

function getAllItems(spu, specList) {
    const res = []

    function combine(pre, index) {
        if (index === specList.length) {
            res.push(`${spu}-${pre.join('-')}`)
            return
        }

        for (let spec of specList[index]) {
            combine([...pre,spec],index+1)
        }
    }
    combine([],0)
    return res
}
console.log(getAllItems(spu,specList));

// function getAllItems(spu, specList, index) {
//     let res = []
//     let path = ''
//     if (index === specList.length-1) {
//         return res
//     }
    
//     if (index === 0) {
//         path = spu + '-'
//     }
//     for (let i = 0; i < specList[index].length; i++){
//         path = path + '-' + specList
//     }
// }