<script setup lang='ts'>
import { computed } from 'vue';
const props = defineProps({
    articalItem: Object
});
const emits = defineEmits(
    ["getDetail"]
);
// let articalContent = toRefs(props).articalItem;
const content1 = computed(() => {
    return props.articalItem.content.slice(0, 100) + "...";
});
const labels = computed(() => {
    return props.articalItem.label.split(",");
});

function getDetail(data: any) {
    emits("getDetail", data);
}

</script>
<template>
    <div class="w-auto min-w-250 h-60 border-2 flex items-center cursor-pointer hover:border-blue-400" @click="getDetail($props)">
        <div class="artical_img w-50 h-50 overflow-hidden ml-5">

            <img class="w-50  overflow-hidden" :src="articalItem.imgUrl" alt="image">

        </div>
        <main class="h-60 w-250 ml-5 text-left">
            <header class="h-15 leading-10 w-100 grid grid-rows-1 grid-cols-[1.6fr,0.8fr,1fr] items-end">
                <div class="articalTitel text-3xl font-bold truncate">{{ articalItem.title }}</div>
                <div class="author truncate">{{ articalItem.author }}</div>
                <div class="createdate truncate">{{ articalItem.createTime }}</div>
            </header>
            <div class="mainContent indent h-30 w-150 truncate whitespace-pre-line">
                {{ content1 }}</div>
            <footer class="w-100 mt-3 label">
                <ul class="flex">
                    <li v-for="item in labels"
                        class="w-20 h-5 rounded-3xl bg-green-200 text-sm text-center cursor-pointer ml-2">
                        <p class="w-16 truncate ml-2">{{ item }}</p>
                    </li>
                </ul>
            </footer>
        </main>
    </div>
</template>
 
<style scoped>
</style>