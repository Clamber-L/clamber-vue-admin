export const useUserStore = defineStore('userStore', () => {
    const accessToken = ref('')
    const refreshToken = ref('')
    const isLogin = ref(false)

    const initState = () => {
        accessToken.value = localStorage.getItem('accessToken') || ''
    }

    const setToken = (newAccessToken: string, newRefreshToken?: string) => {
        accessToken.value = newAccessToken
        if (newRefreshToken) {
            refreshToken.value = newRefreshToken
        }
        sessionStorage.setItem('accessToken', newAccessToken)
    }

    const setLoginStatus = (status: boolean) => {
        isLogin.value = status
    }

    return {
        accessToken,
        refreshToken,
        isLogin,
        initState,
        setToken,
        setLoginStatus
    }
})
