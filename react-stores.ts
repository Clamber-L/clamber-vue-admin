// React 项目状态管理 - 使用 Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户状态管理
interface UserState {
    userInfo: any
    token: string
    isLogin: boolean
    login: (userInfo: any, token: string) => void
    logout: () => void
    setUserInfo: (userInfo: any) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userInfo: null,
            token: '',
            isLogin: false,
            login: (userInfo, token) =>
                set({ userInfo, token, isLogin: true }),
            logout: () =>
                set({ userInfo: null, token: '', isLogin: false }),
            setUserInfo: (userInfo) =>
                set({ userInfo })
        }),
        {
            name: 'user-store'
        }
    )
)

// 设置状态管理
interface SettingState {
    theme: 'light' | 'dark'
    collapsed: boolean
    showNprogress: boolean
    setTheme: (theme: 'light' | 'dark') => void
    setCollapsed: (collapsed: boolean) => void
    setShowNprogress: (show: boolean) => void
}

export const useSettingStore = create<SettingState>()(
    persist(
        (set) => ({
            theme: 'light',
            collapsed: false,
            showNprogress: true,
            setTheme: (theme) => set({ theme }),
            setCollapsed: (collapsed) => set({ collapsed }),
            setShowNprogress: (showNprogress) => set({ showNprogress })
        }),
        {
            name: 'setting-store'
        }
    )
)

// 菜单状态管理
interface MenuState {
    menuList: any[]
    activeMenu: string
    setMenuList: (menuList: any[]) => void
    setActiveMenu: (activeMenu: string) => void
}

export const useMenuStore = create<MenuState>()(
    persist(
        (set) => ({
            menuList: [],
            activeMenu: '',
            setMenuList: (menuList) => set({ menuList }),
            setActiveMenu: (activeMenu) => set({ activeMenu })
        }),
        {
            name: 'menu-store'
        }
    )
)