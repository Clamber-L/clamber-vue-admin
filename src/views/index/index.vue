<template>
    <div class="frame" :style="{ paddingLeft, paddingTop }">
        <!-- 左侧菜单 -->
        <menu-left></menu-left>
        <!-- 顶栏 -->
        <top-bar>
            <work-tab v-if="showWorkTab"></work-tab>
        </top-bar>
        <!-- 内容区域 -->
        <router-view v-slot="{ Component, route }" class="container">
            <transition appear :name="pageTransition">
                <keep-alive :max="10" :exclude="keepAliveExclude">
                    <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
                </keep-alive>
            </transition>
            <transition mode="out-in" appear :name="pageTransition">
                <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
            </transition>
        </router-view>
    </div>
</template>
<script setup lang="ts">
import { useSettingStore } from '@/store/settings.ts'
import { useWorktabStore } from '@/store/worktab.ts'
import TopBar from '@/components/TopBar/index.vue'
import WorkTab from '@/components/WorkTab/index.vue'
import { useMenuStore } from '@/store/menu.ts'
import { MenuWidth } from '@/enums/appEnum.ts'
import { getTabConfig } from '@/utils/tabs.ts'

const settingStore = useSettingStore()
const menuStore = useMenuStore()
const { pageTransition, showWorkTab, menuOpen } = storeToRefs(settingStore)
const { keepAliveExclude } = storeToRefs(useWorktabStore())

// 根据菜单是否打开来设置左侧填充宽度
const paddingLeft = computed(() => {
    const width = menuOpen.value ? settingStore.getMenuOpenWidth : MenuWidth.CLOSE
    menuStore.setMenuWidth(width) // 更新菜单宽度

    return width
})

// 计算顶部填充高度
const paddingTop = computed(() => {
    const { openTop, closeTop } = getTabConfig('tab-default')
    return `${showWorkTab.value ? openTop : closeTop}px`
})
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
