<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
const dta = axios.get('/api/getArticalList/?user_id=1').then(result => {
  console.log("RRRR", result)
  return result
});
onMounted(() => {
  console.log("App.vue ---- onMounted");

  //方式2（创建link标签默认引入 ./css/theme_1.css 主题样式文件）
  let link = document.createElement("link");
  link.type = "text/css";
  link.id = "theme";
  link.rel = "stylesheet";
  // link.href = "../public/css/Github.css";
  document.getElementsByTagName("head")[0].appendChild(link);
});
console.log("data", dta)
</script>
<template>
  <router-view></router-view>
</template>

<style>


/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
} */
</style>
