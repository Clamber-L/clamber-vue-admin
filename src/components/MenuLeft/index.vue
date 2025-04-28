<!-- 左侧菜单 或 双列菜单 -->
<template>
    <div class="left-menu-or-dual-menu">
        <!-- 左侧菜单 || 双列菜单（右侧） -->
        <div
            class="menu-left"
            id="menu-left"
            :class="`menu-left-light menu-left-${!menuOpen ? 'close' : 'open'}`">
            <div class="header" @click="toHome" :style="{ background: getMenuTheme.background }">
                <svg class="svg-icon font-bold text-black" aria-hidden="true">
                    <use xlink:href="#iconsys-zhaopian-copy"></use>
                </svg>
                <p :style="{ color: getMenuTheme.systemNameColor, opacity: !menuOpen ? 0 : 1 }">
                    {{ AppConfig.systemInfo.name }}
                </p>
            </div>
            <el-menu
                :class="'el-menu-' + getMenuTheme.theme"
                :collapse="!menuOpen"
                :default-active="routerPath"
                :text-color="getMenuTheme.textColor"
                :unique-opened="uniqueOpened"
                :background-color="getMenuTheme.background"
                :active-text-color="getMenuTheme.textActiveColor"
                :default-openeds="defaultOpenedsArray"
                :popper-class="`menu-left-${getMenuTheme.theme}-popper`">
                <submenu :list="menuList" :theme="getMenuTheme" @close="closeMenu" />
            </el-menu>

            <div
                class="menu-model"
                @click="visibleMenu"
                :style="{
                    opacity: !menuOpen ? 0 : 1,
                    transform: 'scale(0)'
                }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HOME_PAGE } from '@/router'
import AppConfig from '@/config'
import { MenuWidth } from '@/enums/appEnum'
import { useSettingStore } from '@/store/settings.ts'
import { useMenuStore } from '@/store/menu.ts'
import Submenu from '../Layout/Submenu/submenu.vue'

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()

const { getMenuOpenWidth, uniqueOpened, menuOpen, getMenuTheme } = storeToRefs(settingStore)

const menuCloseWidth = MenuWidth.CLOSE

const defaultOpenedsArray = ref([])

const menuList = computed(() => {
    return useMenuStore().menuList
})

const routerPath = computed(() => {
    return route.path
})

onMounted(() => {
    listenerWindowResize()
})

const toHome = () => {
    router.push(HOME_PAGE)
}

let screenWidth = 0

const listenerWindowResize = () => {
    screenWidth = document.body.clientWidth

    setMenuModel()

    window.onresize = () => {
        return (() => {
            screenWidth = document.body.clientWidth
            setMenuModel()
        })()
    }
}

const setMenuModel = () => {
    // 小屏幕折叠菜单
    if (screenWidth < 800) {
        settingStore.setMenuOpen(false)
    }
}

const visibleMenu = () => {
    settingStore.setMenuOpen(!menuOpen.value)
}

const closeMenu = () => {
    if (document.body.clientWidth < 800) {
        settingStore.setMenuOpen(false)
    }
}
</script>

<style lang="scss" scoped>
@use './style';
</style>

<style lang="scss">
@use './theme';

.menu-left {
    // 展开的宽度
    .el-menu:not(.el-menu--collapse) {
        width: v-bind(getMenuOpenWidth);
    }

    // 折叠后宽度
    .el-menu--collapse {
        width: v-bind(menuCloseWidth);
    }
}
</style>
