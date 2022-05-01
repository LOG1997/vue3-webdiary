<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import {verify} from "./api/request"
onMounted(() => {
  console.log("App.vue ---- onMounted");

  //方式2（创建link标签默认引入 ./css/theme_1.css 主题样式文件）
  let link = document.createElement("link");
  link.type = "text/css";
  link.id = "theme";
  link.rel = "stylesheet";
  // link.href = "../public/css/Github.css";
  document.getElementsByTagName("head")[0].appendChild(link);



  // 验证token
  let token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    console.log("mount:",axios.defaults)
    verify().then((result:any) => {
      console.log("result:",result);
      if (result.data.code == 200) {
        console.log("token验证成功:",result.data.data);
        
      } else {
        console.log("token验证失败");
        localStorage.removeItem("token");
      }
    })
  }
});
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
