<template>
    <div class="box-border flex w-full h-screen">
        <!--    left    -->
        <div class="relative w-1/2 box-border h-full p-20px overflow-hidden bg-#f3f4fb bg-cover">
            <!--logo-->
            <div class="relative z-100 flex items-center">
                <svg class="w-32px h-32px">
                    <use xlink:href="#iconsys-zhaopian-copy"></use>
                </svg>
                <h1 class="text-20px font-400 ml-4 text-#f9f9f9">Clamber-Vue-Admin</h1>
            </div>
            <!--bg img-->
            <img
                class="absolute w-full h-full top-0 left-0 object-cover"
                src="@/assets/img/login/login-bg.jpg" />
            <!--            <img class="relative z-10 block m-15vh m-auto" src="@/assets/img/login/lf_icon1.png" />-->
            <!--text-->
            <div class="absolute w-full bottom-80px text-center">
                <h1 class="text-25px text-#f9f9f9 font-400">专注于用户体验的后台管理系统模版</h1>
                <p class="mt-10px text-15px text-#c4cada">
                    美观实用的界面，经过视觉优化，确保卓越的用户体验
                </p>
            </div>
        </div>
        <!--    right    -->
        <div class="relative flex-1 h-full">
            <!--     login       -->
            <div
                class="absolute-center w-440px h-610px py-5px overflow-hidden bg-cover rounded-5px ring-inset">
                <div class="box-border h-full py-40px">
                    <h3 class="ml-(-3px) text-36px font-600 text-#071437">欢迎回来</h3>
                    <p class="mt-15px text-14px text-#99a1b7">输入您的账号和密码登录</p>
                    <el-form class="mt-25px" ref="formRef" :model="formData" :rules="rules">
                        <el-form-item prop="username" class="mb-22px">
                            <el-input
                                size="large"
                                v-model.trim="formData.username"
                                class="h-46px" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                type="password"
                                size="large"
                                v-model.trim="formData.password"
                                class="h-46px" />
                        </el-form-item>
                        <div class="relative pb-20px mt-25px">
                            <div
                                class="relative z-2 box-border select-none rounded-8px transition-all transition-delay-300">
                                <DragVerify
                                    ref="dragVerify"
                                    v-model:value="isPassing"
                                    :width="width < 500 ? 328 : 438"
                                    text-color="var(--art-gray-800)" />
                            </div>
                            <p>error text</p>
                        </div>

                        <div>
                            <el-checkbox>记住密码</el-checkbox>
                            <div>忘记密码</div>
                        </div>

                        <div>
                            <el-button> 登录 </el-button>
                        </div>

                        <div>
                            <p>还没有账号？</p>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { HOME_PAGE } from '@/router/index.js'
import { useUserStore } from '@/store/user.js'
import DragVerify from '@/components/DragVerify.vue'
import './index.css'

import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const formData = reactive({
    username: 'admin',
    password: 'admin',
    rememberPassword: true
})
const rules = computed<FormRules>(() => ({
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}))
const isPassing = ref(false)
const { width } = useWindowSize()

const login = () => {
    userStore.setLoginStatus(true)
    router.push(HOME_PAGE)
}
</script>
