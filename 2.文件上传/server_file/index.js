const express = require('express')
const cors = require('cors')
const multer = require('multer') // 处理文件上传中间件
const path = require('path')
const fs = require('fs-extra')

const app = express()
app.use(cors()) // 允许跨域

// 设置multer存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload_files/') // 设置文件上传的存储路径
    },
    filename: (req, file, cb) => {
        cb(null,decodeURIComponent(file.originalname))//+path.extname(file.originalname)) // 设置文件名
    }
})

const upload = multer({storage}) // multer实例创建

const dir = './upload_files' // 接受文件存储路径
fs.ensureDir(dir) // 确保文件夹存在，不存在则递归创建

app.post('/upload', upload.single('file'), (req, res) => {
    // upload.single('file')是multer中间件处理formdata数据的方法，将formdata中键名为'file'的值提取并存储在req.file中
    console.log('测试11', req.file);
    
    if (!req.file) {
        return res.status(400).json({message:'没有文件上传'})
    }
    res.json({message:'文件上传成功', filename:req.file.fieldname})
})

app.listen(3000, () => {
    console.log('server is starting, port:3000');
    
})

