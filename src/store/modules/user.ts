import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { router } from '@/router'
import { UserInfo } from '@/types/store'
import { getSysStorage } from '@/utils/storage'
import { MenuListType } from '@/types/menu'
import { useSettingStore } from './setting'
import { useWorkTabStore } from './worktab'

// 用户
export const useUserStore = defineStore('userStore', () => {
    const isLogin = ref(false)
    const isLock = ref(false)
    const lockPassword = ref('')
    const info = ref<Partial<UserInfo>>({})
    const searchHistory = ref<MenuListType[]>([])
    const accessToken = ref('')
    const refreshToken = ref('')

    const getUserInfo = computed(() => info.value)
    const getSettingState = computed(() => useSettingStore().$state)
    const getWorkTabState = computed(() => useWorkTabStore().$state)

    const initState = () => {
        let sys = getSysStorage()

        if (sys) {
            sys = JSON.parse(sys)
            const {
                info: storedInfo,
                isLogin: storedIsLogin,
                searchHistory: storedSearchHistory,
                isLock: storedIsLock,
                lockPassword: storedLockPassword,
                refreshToken: storedRefreshToken
            } = sys.user

            info.value = storedInfo || {}
            isLogin.value = storedIsLogin || false
            isLock.value = storedIsLock || false
            searchHistory.value = storedSearchHistory || []
            lockPassword.value = storedLockPassword || ''
            refreshToken.value = storedRefreshToken || ''
            accessToken.value = sessionStorage.getItem('accessToken') || ''
        }
    }

    const saveUserData = () => {
        saveStoreStorage({
            user: {
                info: info.value,
                isLogin: isLogin.value,
                isLock: isLock.value,
                lockPassword: lockPassword.value,
                searchHistory: searchHistory.value,
                refreshToken: refreshToken.value,
                workTab: getWorkTabState.value,
                setting: getSettingState.value
            }
        })
    }

    const setUserInfo = (newInfo: UserInfo) => {
        info.value = newInfo
    }

    const setLoginStatus = (status: boolean) => {
        isLogin.value = status
    }

    const setSearchHistory = (list: MenuListType[]) => {
        searchHistory.value = list
    }

    const setLockStatus = (status: boolean) => {
        isLock.value = status
    }

    const setLockPassword = (password: string) => {
        lockPassword.value = password
    }

    const setToken = (newAccessToken: string, newRefreshToken?: string) => {
        accessToken.value = newAccessToken
        if (newRefreshToken) {
            refreshToken.value = newRefreshToken
        }
        sessionStorage.setItem('accessToken', newAccessToken)
        saveUserData()
    }

    const logOut = async () => {
        setTimeout(() => {
            info.value = {}
            isLogin.value = false
            isLock.value = false
            lockPassword.value = ''
            accessToken.value = ''
            refreshToken.value = ''
            sessionStorage.removeItem('accessToken')
            useWorkTabStore().opened = []
            saveUserData()
            sessionStorage.removeItem('iframeRoutes')
            router.push('/login')
        }, 300)
    }

    return {
        isLogin,
        isLock,
        lockPassword,
        info,
        searchHistory,
        accessToken,
        refreshToken,
        getUserInfo,
        getSettingState,
        getWorkTabState,
        initState,
        saveUserData,
        setUserInfo,
        setLoginStatus,
        setSearchHistory,
        setLockStatus,
        setLockPassword,
        setToken,
        logOut
    }
})

// 数据持久化存储
function saveStoreStorage<T>(newData: T) {
    const storedData = JSON.parse(localStorage.getItem('sys') || '{}')

    // 合并新数据与现有数据
    const mergedData = { ...storedData, ...newData }
    localStorage.setItem('sys', JSON.stringify(mergedData))
}
