<script setup lang='ts'>
import { ref, reactive } from 'vue';

import { BIconArrowThroughHeartFill, BIconDice1, BIconDice2, BIconDice3, BIconDice4, BIconDice5, BIconDice6 } from 'bootstrap-icons-vue';


import type { FormInstance, FormRules } from 'element-plus'

import {login} from "../../api/request"

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    password: '',
    type: [],
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },


    ],

    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],

})
// 登录
const submitFormLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
    let username=ruleForm.name;
    let password=ruleForm.password;
    console.log("发送结果:",{username,password});
    await login({username,password}).then((result:any)=>{
        console.log("登录结果",result)
        if(result.data.code==200){
            window.location.href="/home"
        }
    })
}
// 注册
const submitFormRegister = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// 是否登录还是注册页面
let isLoginView = ref(true);
function changeLoginView() {
    isLoginView.value = !isLoginView.value;

}
</script>
 
<template>
    <div class="login-bg w-screen h-screen flex justify-center  items-center">
        <div class="absolute w-4xl h-50 bg-blue-400/50 divide-x flex text-center justify-center  shadow-lg">
            <div class="left w-1/2  flex flex-col  items-center">
                <div class="lll left flex flex-col  items-center" v-if="isLoginView">

                    <BIconArrowThroughHeartFill class="text-8xl text-purple-700 mt-10" />
                    <h3 class="mt-5">Login</h3>

                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm"
                        :size="formSize">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" />
                        </el-form-item>



                        <el-form-item>
                            <el-button type="primary" @click="submitFormLogin(ruleFormRef)">登录</el-button>
                            <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <div>Not Registered yet?<a class="text-blue-600 cursor-pointer hover:text-blue-800"
                            @click="changeLoginView">Create Account</a></div>

                </div>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" class="my-30 mx-30"
                    alt="" v-if="!isLoginView" />
            </div>
            <div class="imgitem w-1/2">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" class="my-30 mx-30"
                    alt="" v-if="isLoginView" />

                <div class="lll left flex flex-col  items-center" v-if="!isLoginView">

                    <BIconArrowThroughHeartFill class="text-8xl text-purple-700 mt-10" />
                    <h3 class="mt-5">Register</h3>

                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm"
                        :size="formSize">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" />
                        </el-form-item>



                        <el-form-item>
                            <el-button type="primary" @click="submitFormRegister(ruleFormRef)">注册</el-button>
                            <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <div>Yet Have a Account?<a class="text-blue-600 cursor-pointer hover:text-blue-800"
                            @click="changeLoginView">Login</a></div>

                </div>

            </div>
        </div>
    </div>
</template>
 
<style scoped>
.login-bg {
    background: red;
    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    background-size: 400% 400%;
    -webkit-animation: Gradient 15s ease infinite;
    -moz-animation: Gradient 15s ease infinite;
    animation: Gradient 15s ease infinite;
}

@-webkit-keyframes Gradient {
    0% {
        background-position: 0% 50%
    }

    50% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0% 50%
    }
}

@-moz-keyframes Gradient {
    0% {
        background-position: 0% 50%
    }

    50% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0% 50%
    }
}

@keyframes Gradient {
    0% {
        background-position: 0% 50%
    }

    50% {
        background-position: 100% 50%
    }

    100% {
        background-position: 0% 50%
    }
}
</style>
