<template>
    <div class="frame">
        <!-- 左侧菜单 -->
        <menu-left></menu-left>
        <!-- 内容区域 -->
        <router-view v-slot="{ Component, route }" class="container">
            <transition appear>
                <keep-alive :max="10">
                    <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
                </keep-alive>
            </transition>
            <transition mode="out-in" appear>
                <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
            </transition>
        </router-view>
    </div>
</template>
<script setup lang="ts">
import { useSettingStore } from '@/store/settings.ts'

const settingStore = useSettingStore()
storeToRefs(settingStore)
</script>
<style lang="scss">
.frame {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: var(--art-bg-color);
    transition: padding 0.3s ease-in-out;

    .container {
        box-sizing: border-box;
        width: calc(100% - 40px);
        margin: auto;

        // 子页面默认style
        :deep(.page-content) {
            position: relative;
            box-sizing: border-box;
            padding: 20px;
            overflow: hidden;
            background: var(--art-main-bg-color);
            border-radius: var(--custom-radius) !important;
        }
    }
}
</style>
