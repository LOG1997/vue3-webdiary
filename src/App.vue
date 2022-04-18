<script setup lang="ts">
import axios from 'axios';
const dta=axios.get('/api/getArticalList/?user_id=1').then(result=>{
  console.log("RRRR",result)
  return result
});
console.log("data",dta)
</script>
<template>


<router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
