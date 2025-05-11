<template>
    <div class="left-view">
        <div class="logo">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconsys-zhaopian-copy"></use>
            </svg>
            <h1 class="title">{{ AppConfig.systemInfo.name }}</h1>
        </div>
        <img class="left-bg" :src="loginImage" alt="" v-if="loginImageLoaded" />

        <div class="text-wrap">
            <h1>专注于用户体验的后台管理系统模版</h1>
            <p>美观实用的界面，经过视觉优化，确保卓越的用户体验</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppConfig from '@/config'
import { SettingApi } from '@/api/settingApi.ts'
import { ApiStatus } from '@/utils/http/status.ts'
import { useSettingStore } from '@/store/modules/setting.ts'

const { loginImage, loginImageLoaded } = storeToRefs(useSettingStore())

const image = async () => {
    console.log(loginImage)
    const response = await SettingApi.loginImage()
    if (response.code === ApiStatus.success && response.data.imageUrl !== '') {
        console.log(response.data)
        loginImage.value = response.data.imageUrl
        loginImageLoaded.value = true
    }
}

onMounted(() => {
    image()
})
</script>

<style lang="scss" scoped>
@use '@/views/login/index' as login;
</style>
