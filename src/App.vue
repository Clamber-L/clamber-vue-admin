<template>
    <el-config-provider :size="elSize" :locale="zh" :z-index="3000">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts">
import zh from 'element-plus/es/locale/lang/zh-cn'
import { UserApi } from '@/api/usersApi.ts'
import { useUserStore } from './store/modules/user'
import { initState, saveUserData } from './utils/storage'
import { ApiStatus } from './utils/http/status'

const userStore = useUserStore()
const elSize = computed(() => (document.body.clientWidth >= 500 ? 'large' : 'default'))

onBeforeMount(() => {
    setBodyClass(true)
})

onMounted(() => {
    initState()
    saveUserData()
    setBodyClass(false)
    getUserInfo()
})

// 获取用户信息
const getUserInfo = async () => {
    if (userStore.isLogin) {
        const userRes = await UserApi.userInfo()
        if (userRes.code === ApiStatus.success) {
            userStore.setUserInfo(userRes.data)
        }
    }
}

// 提升暗黑主题下页面刷新视觉体验
const setBodyClass = (addClass: boolean) => {
    const el = document.getElementsByTagName('body')[0]

    if (addClass) {
        el.setAttribute('class', 'theme-change')
    } else {
        setTimeout(() => {
            el.removeAttribute('class')
        }, 300)
    }
}
</script>
