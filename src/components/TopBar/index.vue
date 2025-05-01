<template>
    <div class="top-bar" :class="[tabStyle]" :style="{ width: topBarWidth() }">
        <div class="menu">
            <div class="left" style="display: flex">
                <!-- 菜单按钮 -->
                <div class="btn-box" v-if="showMenuButton">
                    <div class="btn menu-btn">
                        <i class="iconfont-sys" @click="visibleMenu">&#xe6ba;</i>
                    </div>
                </div>
                <!-- 面包屑 -->
                <breadcrumb
                    v-if="showCrumbs"
                    :style="{
                        paddingLeft: !showMenuButton ? '10px' : '0'
                    }" />
            </div>

            <div class="right">
                <!-- 全屏按钮 -->
                <div class="btn-box screen-box" @click="toggleFullScreen">
                    <div
                        class="btn"
                        :class="{
                            'full-screen-btn': !isFullscreen,
                            'exit-full-screen-btn': isFullscreen
                        }">
                        <i class="iconfont-sys">{{ isFullscreen ? '&#xe62d;' : '&#xe8ce;' }}</i>
                    </div>
                </div>
                <!-- 通知 -->
                <div class="btn-box notice-btn" @click="visibleNotice">
                    <div class="btn notice-button">
                        <i class="iconfont-sys notice-btn">&#xe6c2;</i>
                        <span class="count notice-btn"></span>
                    </div>
                </div>
                <!-- 聊天 -->
                <div class="btn-box chat-btn" @click="openChat">
                    <div class="btn chat-button">
                        <i class="iconfont-sys">&#xe89a;</i>
                        <span class="dot"></span>
                    </div>
                </div>

                <!-- 用户头像、菜单 -->
                <div class="user">
                    <el-popover
                        ref="userMenuPopover"
                        placement="bottom-end"
                        :width="240"
                        :hide-after="0"
                        :offset="10"
                        trigger="hover"
                        :show-arrow="false"
                        popper-class="user-menu-popover"
                        popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: calc(var(--custom-radius) / 2 + 4px); padding: 5px 16px; 5px 16px;">
                        <template #reference>
                            <!--                            <img class="cover" :src="userInfo.avatar" />-->
                        </template>
                        <template #default>
                            <div class="user-menu-box">
                                <div class="user-head">
                                    <!--                                    <img class="cover" :src="userInfo.avatar" style="float: left" />-->
                                    <div class="user-wrap">
                                        <!--                                        <span class="name">{{ userInfo.username }}</span>-->
                                        <!--                                        <span class="email" v-if="userInfo.email">{{-->
                                        <!--                                            userInfo.email-->
                                        <!--                                        }}</span>-->
                                    </div>
                                </div>
                                <ul class="user-menu">
                                    <li @click="goPage('/user/user')">
                                        <i class="menu-icon iconfont-sys">&#xe734;</i>
                                        <span class="menu-txt">个人中心</span>
                                    </li>
                                    <li @click="toDocs()">
                                        <i class="menu-icon iconfont-sys" style="font-size: 15px"
                                            >&#xe828;</i
                                        >
                                        <span class="menu-txt">使用文档</span>
                                    </li>
                                    <li @click="toGithub()">
                                        <i class="menu-icon iconfont-sys">&#xe8d6;</i>
                                        <span class="menu-txt">Github</span>
                                    </li>
                                    <li @click="lockScreen()">
                                        <i class="menu-icon iconfont-sys">&#xe817;</i>
                                        <span class="menu-txt">锁定屏幕</span>
                                    </li>
                                    <div class="line"></div>
                                    <div class="logout-btn" @click="loginOut">退出登录</div>
                                </ul>
                            </div>
                        </template>
                    </el-popover>
                </div>
            </div>
        </div>
        <slot></slot>

        <Notice v-model:value="showNotice" ref="notice" />
    </div>
</template>

<script setup lang="ts">
import { MenuWidth } from '@/enums/appEnum'
import { useFullscreen } from '@vueuse/core'
import { WEB_LINKS } from '@/utils/links'
import { useSettingStore } from '@/store/settings.ts'
import { useUserStore } from '@/store/user.ts'
import mittBus from '@/utils/mittBus.ts'
import Breadcrumb from '../Breadcrumb/index.vue'
import Notice from '../Notice/index.vue'

const isWindows = navigator.userAgent.includes('Windows')

const settingStore = useSettingStore()
const userStore = useUserStore()
const router = useRouter()

const { showMenuButton, menuOpen, showCrumbs, tabStyle } = storeToRefs(settingStore)

const { getUserInfo: userInfo } = storeToRefs(userStore)

const showNotice = ref(false)
const notice = ref(null)
const userMenuPopover = ref()

onMounted(() => {
    document.addEventListener('click', bodyCloseNotice)
})

onUnmounted(() => {
    document.removeEventListener('click', bodyCloseNotice)
})

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const toggleFullScreen = () => {
    toggleFullscreen()
}

const topBarWidth = (): string => {
    const { getMenuOpenWidth } = settingStore
    return menuOpen.value ? `calc(100% - ${getMenuOpenWidth})` : `calc(100% - ${MenuWidth.CLOSE})`
}

const visibleMenu = () => {
    settingStore.setMenuOpen(!menuOpen.value)
}

const goPage = (path: string) => {
    router.push(path)
}

const toDocs = () => {
    window.open(WEB_LINKS.DOCS)
}

const toGithub = () => {
    window.open(WEB_LINKS.GITHUB)
}

const loginOut = () => {
    closeUserMenu()
    // setTimeout(() => {
    //     ElMessageBox.confirm(t('common.logOutTips'), t('common.tips'), {
    //         confirmButtonText: t('common.confirm'),
    //         cancelButtonText: t('common.cancel'),
    //         customClass: 'login-out-dialog'
    //     }).then(() => {
    //         userStore.logOut()
    //     })
    // }, 200)
}

// const reload = (time: number = 0) => {
//     // setTimeout(() => {
//     //     useCommon().refresh()
//     // }, time)
// }
//
// const openSetting = () => {
//     mittBus.emit('openSetting')
//
//     // 隐藏设置引导
//     // if (showSettingGuide.value) {
//     //     // settingStore.hideSettingGuide()
//     // }
//     // 打开设置引导
//     // settingStore.openSettingGuide()
// }

const openSearchDialog = () => {
    mittBus.emit('openSearchDialog')
}

const bodyCloseNotice = (e: any) => {
    const { className } = e.target

    if (showNotice.value) {
        if (typeof className === 'object') {
            showNotice.value = false
            return
        }
        if (className.indexOf('notice-btn') === -1) {
            showNotice.value = false
        }
    }
}

const visibleNotice = () => {
    showNotice.value = !showNotice.value
}

const openChat = () => {
    mittBus.emit('openChat')
}

const lockScreen = () => {
    mittBus.emit('openLockScreen')
}

const closeUserMenu = () => {
    setTimeout(() => {
        userMenuPopover.value.hide()
    }, 100)
}
</script>

<style lang="scss" scoped>
@use './style';
</style>
