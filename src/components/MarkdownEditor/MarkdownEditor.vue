<script setup lang='ts'>
import { ref, reactive, toRefs, toRef, onMounted, onUnmounted } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
let artical = ref({
    content: '# title',
    title: '',
})
function pri() {
    console.log(artical.value)
}
onMounted(() => {
    window.onbeforeunload = function (e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
            e.returnValue = '系统可能不会保存你所做的修改';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '系统可能不会保存你所做的修改';
    }
})
onUnmounted(() => {
    window.onbeforeunload = null
})

</script>
 
<template>
    <div class="md-edtior w-auto text-left">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input type="text" class="form-control" style="width:100px" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1">
            <button class="btn btn-primary" type="submit">Button</button>
        </div>
        <md-editor v-model="artical.content" />
    </div>
</template>
 
<style scoped>
.input_title {
    width: 100px;
}
</style>