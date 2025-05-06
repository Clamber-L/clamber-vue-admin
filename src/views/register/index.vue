<template>
    <div class="login register">
        <div class="left-wrap">
            <left-view></left-view>
        </div>
        <div class="right-wrap">
            <div class="header">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconsys-zhaopian-copy"></use>
                </svg>
                <h1>{{ systemName }}</h1>
            </div>
            <div class="login-wrap">
                <div class="form">
                    <h3 class="title">创建账号</h3>
                    <p class="sub-title">欢迎加入我们，请填写以下信息完成注册</p>
                    <el-form ref="formRef" :model="formData" :rules="rules" label-position="top">
                        <el-form-item prop="username">
                            <el-input
                                v-model.trim="formData.username"
                                placeholder="请输入账号"
                                size="large" />
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input
                                v-model.trim="formData.password"
                                placeholder="请输入密码"
                                size="large"
                                type="password"
                                autocomplete="off" />
                        </el-form-item>

                        <el-form-item prop="confirmPassword">
                            <el-input
                                v-model.trim="formData.confirmPassword"
                                placeholder="请再次输入密码"
                                size="large"
                                type="password"
                                autocomplete="off"
                                @keyup.enter="register" />
                        </el-form-item>

                        <el-form-item prop="agreement">
                            <el-checkbox v-model="formData.agreement">
                                我同意
                                <router-link
                                    style="color: var(--main-color); text-decoration: none"
                                    to="/privacy-policy"
                                    >《隐私政策》</router-link
                                >
                            </el-checkbox>
                        </el-form-item>

                        <div style="margin-top: 15px">
                            <el-button
                                class="register-btn"
                                size="large"
                                type="primary"
                                @click="register"
                                :loading="loading"
                                v-ripple>
                                注册
                            </el-button>
                        </div>

                        <div class="footer">
                            <p>
                                已有账号？
                                <router-link to="/login">去登录</router-link>
                            </p>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LeftView from '@/components/Pages/Login/LeftView.vue'
import AppConfig from '@/config'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()

const systemName = AppConfig.systemInfo.name
const loading = ref(false)

const formData = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    agreement: false
})

const validatePass = (_: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (formData.confirmPassword !== '') {
            formRef.value?.validateField('confirmPassword')
        }
        callback()
    }
}

const validatePass2 = (_: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== formData.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    agreement: [
        {
            validator: (_: any, value: boolean, callback: any) => {
                if (!value) {
                    callback(new Error('请同意隐私协议'))
                } else {
                    callback()
                }
            },
            trigger: 'change'
        }
    ]
})

const register = async () => {
    if (!formRef.value) return

    try {
        await formRef.value.validate()
        loading.value = true

        // 模拟注册请求
        setTimeout(() => {
            loading.value = false
            ElMessage.success('注册成功')
            toLogin()
        }, 1000)
    } catch (error) {
        console.log('验证失败', error)
    }
}

const toLogin = () => {
    setTimeout(() => {
        router.push('/login')
    }, 1000)
}
</script>

<style lang="scss" scoped>
@use '../login/index' as login;
@use './index' as register;
</style>
