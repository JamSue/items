<template>
  <h2>欢迎来到FiveClub</h2>
  <div class="nav">
    <RouterLink class="button" to="/home" active-class="active">主页</RouterLink>
    <RouterLink class="button" to="/news" active-class="active">新闻</RouterLink>
    <RouterLink class="button" to="/about" active-class="active">关于</RouterLink>
  </div>
</template>

<script setup lang="ts">

</script>

<style >
    h2{
       display: block;
       font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
       border: solid 2px rgb(215, 174, 174);
       border-radius: 30px;
       background-color: palevioletred;
       height: 10vh;
       /* 行内元素设置与height相同高度，使得内容居中 */
       line-height: 10vh; 
       text-align: center;
    }
    .nav{
        margin-top:5px;
        display: flex;
    }
    .button{
        text-decoration: none; /* 去掉下滑线 */
        color: inherit; /* 文字颜色继承父级 */
        margin-left:20%;
        padding: 5px;
        border: solid 2px rgb(215, 174, 174);
        border-radius: 20%;
        background-color: #fff;
    }
    .active{
      background-color:  palevioletred;
      color:white;
    }
</style>