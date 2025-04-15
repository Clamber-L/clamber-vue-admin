<template>
    <div class="box-border flex w-full h-screen">
        <!--    left    -->
        <div class="relative w-1/2 box-border h-full p-20px overflow-hidden bg-#f3f4fb bg-cover">
            <!--logo-->
            <div class="relative z-100 flex items-center">
                <svg class="w-32px h-32px">
                    <use xlink:href="#iconsys-zhaopian-copy"></use>
                </svg>
                <h1 class="text-20px font-400 ml-4 text-#f9f9f9">Clamber-Vue-Admin</h1>
            </div>
            <!--bg img-->
            <img
                class="absolute w-full h-full top-0 left-0 object-cover"
                src="@/assets/img/login/login-bg.jpg" />
            <!--            <img class="relative z-10 block m-15vh m-auto" src="@/assets/img/login/lf_icon1.png" />-->
            <!--text-->
            <div class="absolute w-full bottom-80px text-center">
                <h1 class="text-25px text-#f9f9f9 font-400">专注于用户体验的后台管理系统模版</h1>
                <p class="mt-10px text-15px text-#c4cada">
                    美观实用的界面，经过视觉优化，确保卓越的用户体验
                </p>
            </div>
        </div>
        <!--    right    -->
        <div class="relative flex-1 h-full">right</div>
    </div>
</template>

<script setup>
import { HOME_PAGE } from '@/router/index.js'
import { useUserStore } from '@/store/user.js'

const router = useRouter()
const userStore = useUserStore()

const login = () => {
    userStore.setLoginStatus(true)
    router.push(HOME_PAGE)
}
</script>
