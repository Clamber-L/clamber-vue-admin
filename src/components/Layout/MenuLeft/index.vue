<!-- 左侧菜单 或 双列菜单 -->
<template>
    <div class="left-menu-or-dual-menu">
        <!-- 左侧菜单 || 双列菜单（右侧） -->
        <div
            class="menu-left"
            id="menu-left"
            :class="`menu-left-${getMenuTheme.theme} menu-left-${!menuOpen ? 'close' : 'open'}`"
            :style="{ background: getMenuTheme.background }">
            <div class="header" @click="toHome" :style="{ background: getMenuTheme.background }">
                <svg class="svg-icon" aria-hidden="true">
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
                <submenu
                    :list="menuList"
                    :isMobile="isMobileModel"
                    :theme="getMenuTheme"
                    @close="closeMenu" />
            </el-menu>

            <div
                class="menu-model"
                @click="visibleMenu"
                :style="{
                    opacity: !menuOpen ? 0 : 1,
                    transform: showMobileModel ? 'scale(1)' : 'scale(0)'
                }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppConfig from '@/config'
import { HOME_PAGE } from '@/router'
import { useSettingStore } from '@/store/modules/setting'
import { MenuWidth } from '@/enums/appEnum'
import { useMenuStore } from '@/store/modules/menu'
import Submenu from '../Submenu/submenu.vue'

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

const isMobileModel = ref(false)
const showMobileModel = ref(false)

watch(
    () => !menuOpen.value,
    (collapse: boolean) => {
        if (!collapse) {
            showMobileModel.value = true
        }
    }
)

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

    // 移动端模态框
    if (!showMobileModel.value) {
        showMobileModel.value = true
    } else {
        setTimeout(() => {
            showMobileModel.value = false
        }, 200)
    }
}

const closeMenu = () => {
    if (document.body.clientWidth < 800) {
        settingStore.setMenuOpen(false)
        showMobileModel.value = false
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
