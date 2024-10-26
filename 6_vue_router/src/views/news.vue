<template>
  <div>
    <ul>
        <li v-for="item in news" :key="item.id">{{ item.title }}</li>
        <!-- <router-link ></router-link> -->
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup >
import { reactive } from 'vue';
const news = reactive([
    {id:'0001', title:'新闻123', content:'震惊！彭某某居然不知道自己的mbti'},
    {id:'0002', title:'西瓜葡萄梨', content:'号外！号外！水果打架比赛于每日进行'},
    {id:'0003', title:'鸡蛋荞麦面条', content:'专家称，鸡蛋荞麦面减肥是个大骗局'},
    {id:'0004', title:'复杂的人格', content:'人格复杂，多重面具？'}
   ])
</script>

<style scoped>
  
</style>