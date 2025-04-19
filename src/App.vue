<script setup lang="ts">
import zh from 'element-plus/es/locale/lang/zh-cn'

const elSize = computed(() => (document.body.clientWidth >= 500 ? 'large' : 'default'))
</script>

<template>
    <el-config-provider :size="elSize" :locale="zh" :z-index="3000">
        <router-view></router-view>
    </el-config-provider>
</template>

<style scoped></style>
