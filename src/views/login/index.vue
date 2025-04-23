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
                    <el-form
                        class="mt-25px"
                        ref="formRef"
                        :model="formData"
                        :rules="rules"
                        @keyup.enter="login">
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
                                    :class="{ 'border-#f56c6c': isClickPass && !isPassing }"
                                    ref="dragVerify"
                                    v-model:value="isPassing"
                                    :width="width < 500 ? 328 : 438"
                                    text-color="var(--art-gray-800)" />
                            </div>
                            <p
                                class="absolute top-0 z-1 mt-10px text-13px text-#f56c6c transition-all transition-delay-300"
                                :class="{ 'translate-y-40px': isClickPass && !isPassing }">
                                请拖动滑块完成验证
                            </p>
                        </div>

                        <div class="flex items-center justify-between text-14px text-#99a1b7">
                            <el-checkbox v-model="formData.rememberPassword">记住密码</el-checkbox>
                            <router-link class="decoration-none color-blue" to="/forget_password"
                                >忘记密码</router-link
                            >
                        </div>

                        <div class="mt-30px">
                            <el-button
                                class="w-full color-#fff rounded-2xl border-0"
                                size="large"
                                type="primary"
                                :loading="loading"
                                @click="login">
                                登录
                            </el-button>
                        </div>

                        <div class="mt-20px text-14px text-#252f4a">
                            <p>
                                还没有账号？
                                <router-link class="decoration-none color-blue" to="/register"
                                    >注册</router-link
                                >
                            </p>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/store/user.js'
import DragVerify from '@/components/DragVerify.vue'
import './index.css'

import { ElMessage, ElNotification, FormInstance, FormRules } from 'element-plus'
import { HOME_PAGE } from '@/router'
import { UserApi } from '@/api/userApi.ts'
import { ApiStatus } from '@/utils/http/status.ts'

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
const isClickPass = ref(false)
const { width } = useWindowSize()

const loading = ref(false)

onMounted(() => {
    if (userStore.isLogin) {
        console.log('is login')
        router.push(HOME_PAGE)
    }
})

const showLoginSuccessNotice = () => {
    setTimeout(() => {
        ElNotification({
            title: '成功',
            type: 'success',
            showClose: false,
            duration: 2500,
            zIndex: 10000,
            message: '欢迎!'
        })
    }, 300)
}

const login = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
        if (valid) {
            if (!isPassing.value) {
                isClickPass.value = true
                return
            }
            loading.value = true

            // 辅助延时函数
            const delay = (ms: number) =>
                new Promise((resolve) => {
                    setTimeout(resolve, ms)
                })
            try {
                const res = await UserApi.login({
                    username: formData.username,
                    password: formData.password
                })

                if (res.code === ApiStatus.success && res.data) {
                    // 登录成功
                    userStore.setToken(res.data)
                    userStore.setLoginStatus(true)
                    // 延时辅助函数
                    await delay(1000)
                    // 登录成功提示
                    showLoginSuccessNotice()
                    // 跳转首页
                    await router.push(HOME_PAGE)
                } else {
                    ElMessage.error(res.message)
                }
            } finally {
                await delay(1000)
                loading.value = false
            }
        }
    })
}
</script>
