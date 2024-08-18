// 实现功能：鼠标选中哪张照片就先删除已有的active 再将该照片class增加active

// const img = document.querySelector('.panel') //自动获取第一个img了
// img.addEventListener('click', function () {
//     console.log("1");
// })
//步骤：1.获取事件源对象=>每一个class为panel的元素
//     2.增加监听事件
const panels = document.querySelectorAll(".panel")

panels.forEach(panel => {
    panel.addEventListener('click', function () {
        removeAllactive();
        panel.classList.add('active')
    })
});


function removeAllactive() {
        panels.forEach(panel => {
        panel.classList.remove('active')
    })
}
