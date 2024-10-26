<script setup lang="ts" components: { navigate }>
import navigate from './components/navigate.vue';

</script>

<template>
  <navigate/>
  <router-view class="show"></router-view>
</template>

<style scoped>
  .show{
    display: flex;
    margin: 0 auto;
    margin-top:20px;
    height: 60vh;
    width: 60vw;
    border: solid 2px rgb(215, 174, 174);
  }
</style>
