<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// 导入提交api
import { submitArtical } from '../api/request';
const route = useRoute();
let content = ref();
let title=ref();

function submitContent(){
    let data={
        title:title.value,
        content:content.value,
        // user_id:暂时为1
        user_id:1,
        // id:3,
        label:"vue,js,mysql,nodejs",
    }
    submitArtical(data).then((result:any)=>{
        console.log("提交成功",result);
        return result
    })
}
onMounted(() => {
    content.value=route.query.content;
    title.value=route.query.title;
    console.log("获取到的参数", route.query);
});
</script>
 
<template>
<h2>文章内容</h2>
    <div class="md-edtior w-auto text-left mt-10">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">标题</span>
            <input type="text" class="form-control" style="width:100px" placeholder="标题" aria-label="标题"
                aria-describedby="basic-addon1" v-model="title">
            <button class="btn btn-primary" type="submit" @click="submitContent">提交</button>
        </div>
            <MdEditor v-model="content" />
        </div>
</template>
 
<style scoped>
</style>