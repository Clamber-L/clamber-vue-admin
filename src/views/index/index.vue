<template>
    <!-- 左侧菜单 -->
    <menu-left></menu-left>
    <!-- 内容区域 -->
    <router-view v-slot="{ Component, route }">
        <transition appear>
            <keep-alive :max="10">
                <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
            </keep-alive>
        </transition>
        <transition mode="out-in" appear>
            <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
        </transition>
    </router-view>
</template>
