<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const route = useRoute();
let content = ref();
let title=ref();
onMounted(() => {
    content.value=route.query.content;
    title.value=route.query.title;
    console.log("获取到的参数", route.query);
});
</script>
 
<template>
    <div class="md-edtior w-auto text-left mt-10">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">标题</span>
            <input type="text" class="form-control" style="width:100px" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" v-model="title">
            <button class="btn btn-primary" type="submit">Button</button>
        </div>
            <md-editor v-model="content" />
        </div>
</template>
 
<style scoped>
</style>