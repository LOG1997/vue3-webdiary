<script  setup lang='ts'>
import { ref, reactive } from 'vue'
import Head from "./head/Head.vue"
import ArticalItem from "../components/artical/ArticalItem.vue";
import {ArticalType} from "../types/types";
import { getAll } from "../api/request"
import {useRouter} from 'vue-router'
import axios from 'axios'


let articalList = ref()
getAll({"user_id":1}).then((result:any) => {
    console.log("result:",typeof result);
    articalList.value = result.data.articalList;
    return result.data
});
// const dta=axios.get('/api/getArticalList/?user_id=1').then(result=>{
//   console.log("RRRR",result)
//   articalList.value = result.data.articalList;
//   return result
// });
const clicktoPage = (page: number) => {
    console.log(page)
}
const router = useRouter()
function getDetail(data:any){
    console.log("传递数据",data.articalItem);
    router.push({
        path:`/content`,
        query:{
            id:data.articalItem.id,
            user_id:data.articalItem.user_id,
        }
    })
}
// 跳转用户登录页面
function toUserRoute(data:string){
    router.push({
        path:`/${data}`
    })
}
</script>
 
<template>
    <header class="w-auto h-20 bg-gray-800 flex text-warm-gray-200 justify-center shadow-xl">

        <Head @clicktoPage="clicktoPage" @toUserRoute="toUserRoute"></Head>
    </header>
    <main class="w-auto border-2 grid grid-cols-1 grid-rows-3 justify-items-center">
        <div class="w-3/5 h-100  min-3/5">
            <ArticalItem class="mt-10" v-for="item in articalList" :articalItem="item" @getDetail="getDetail"></ArticalItem>
        </div>
    </main>
</template>
 
<style scoped>
</style>