<template>
  <div>
    <!-- <el-upload
        class="upload-demp"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :on-change="handleFileChange"
        :on-success="handleUploadSuccess"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload_text" >将文件拖到此处，或<em>点击上传</em></div>
    </el-upload> -->
    <h2>大文件上传</h2>
    <input type="file" @change="handleFileChange"/>
    <button @click="uploadFile">上传服务器</button>
    <p v-if="progress">上传进度：{{ progress }}</p>
    <p v-if="message">{{ message }}</p>
    <br>
    <br>
    <hr>

    <button @click="clickMe">点击吸猫</button>
    <br>
    <br>
    <img :src="imgUrl" alt="cat"/>
  </div>
</template>

<script>
export default {
    data() {
        return {
            file: null,
            progress: 1, // 文件上传进度
            message: '',
            chunkSize: 5*1024*1024, // 默认分片大小为5M
            minChunkSize: 5*1024*1024, // 最小分片大小为5MB
            maxChunkSize: 100*1024*1024, // 最大分片大小为100MB
            imgUrl:'' 
     }   
    },
    methods: {
        handleFileChange(event) {
            this.file = event.target.files[0]
            console.log('查看文件信息', this.file);
            
        },
        setChunkSize(fileSize) {
            if (fileSize > 5 * 1024 * 1024 * 1024) { // 文件大小大于5GB，将分片大小设为100MB
                this.chunkSize = this.maxChunkSize
            } else {
                this.chunkSize = this.minChunkSize
            }
        },
        async uploadFile() {
            if (!this.file) {
                alert('请先选择一个文件')
                return
            }
            const formData = new FormData(); // 内部数据是键值对，通常将formData类型的数据提交给服务器
            const fileName = encodeURIComponent(this.file.name); // 编码文件名
            formData.append('file', this.file, fileName); 
            // formData.append('file', this.file)
            // console.log('this.file', this.file);
            console.log('formData', formData);
            for (let pairs of formData.entries()) {
                console.log('pairs', pairs);
                
            }
            
            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body:formData
            }).then(response => response.json())
                .then(data => {
                    this.message = data.message
                    console.log('file uploaded success', data);
                
                })
                .catch(err => {
                    this.message = 'upload failed'
                    console.log('file uploading failed', err);
                
            })
            
       },
        clickMe() {
            let url = 'https://api.thecatapi.com/v1/images/search?limit=1'
           fetch(url).then(res => {
               return res.json() 
                 /* 
                 第一个 then 中的 res 是 Response 对象，
                 调用 json() 方法后，你会得到一个新的 Promise，
                 该 Promise 最终会解析为 JSON 数据。
                  */
           }).then(data => {
                // console.log('data', data); // then 处理解析后的数据，并可以进行进一步的操作
                this.imgUrl = data[0].url // 此处的this继承外层作用域clickMe函数的作用域
            })
        }
    }
}
</script>

<style scoped>
    button{
        background-color: #966099;
        border: solid rgb(219, 230, 228) 2px;
        border-radius: 20px;
        color:white;
    }
    img{
        width: 200px;
        height: 200px;
    }
</style>