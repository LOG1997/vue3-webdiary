<script setup lang='ts'>
import { ref, reactive } from 'vue';



</script>
 
<template>
    <div class="w-4/5 h-20 bg-gray-800 flex text-warm-gray-200 justify-center">
        <div class="titel font-serif leading-20 text-2xl w-50 text-center cursor-pointer">WebDiary</div>
        <nav class="w-200 pl-40 min-w-200">
            <ul class="flex gap-15 leading-20 cursor-pointer basis-8/12 text-gray-50">
                <router-link to="/home" class="no-underline text-gray-50">
                    <li class=" hover:text-blue-400">首页</li>
                </router-link>
                <li class=" hover:text-blue-400">内容</li>

                <router-link to="/editor" class="no-underline text-gray-50">
                    <li class=" hover:text-blue-400">编辑</li>
                </router-link>
                <li class=" hover:text-blue-400">关于</li>
            </ul>
        </nav>
        <div class="user w-40 h-20 flex items-center">
            <div class="w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle"
                    viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
            </div>
            <span class="leading-20 ml-5">user</span>
        </div>
    </div>
</template>
 
<style scoped>
</style>