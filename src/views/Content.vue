<script setup lang='ts'>
import { type } from 'os';
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getArtical } from '../api/request';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// import showdown from 'showdown';
// let converter=new showdown.Converter();
// converter.setOption('tables', true);
// function comileMarkdown(value:string) {
//     return converter.makeHtml(value);
// }
const route = useRoute();
let id = ref();
let user_id = ref();
let data = ref();
onMounted(() => {
    id.value = route.query.id;
    user_id.value = route.query.user_id;
    console.log("Home传递过来的参数", route.query);
    getArtical({ "id": id.value }).then((result: any) => {
        console.log("RRRR", result.data.artical)
        data.value = result.data.artical[0]
        return 1
    });


});
</script>
 
<template>
    <div v-if="data" class="text-center w-200 container mx-auto cursor-default shadow-md">
        <h2 class="w-200 mx-auto text-left h-50 leading-50 text-6xl font-bold">{{ data.title }}</h2>
        <div class="w-200 text-left mx-auto gap-10">
            <span>author:</span>
            <span class="mr-10 bg-blue-200 w-10 pl-10 pr-10 rounded-2xl cursor-pointer">{{ data.user_id }}</span>
            <span>发表时间</span>
            <span class="mr-10 bg-fuchsia-200 w-10 pl-10 pr-10 rounded-2xl">{{ data.create_time.slice(0, 10) }}</span>
        </div>
        <div class="w-200 mx-auto text-left">
            <div>
                <MdEditor class="c-markdown" v-model="data.content" :previewOnly="true"></MdEditor>
            </div>
        </div>

    </div>
</template>
 
<style scoped>
</style>