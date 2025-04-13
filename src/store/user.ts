export const useUserStore = defineStore('userStore', () => {
    const accessToken = ref('')
    const refreshToken = ref('')

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

    return {
        accessToken,
        refreshToken,
        initState,
        setToken
    }
})
