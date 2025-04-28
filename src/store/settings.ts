import { MenuThemeEnum, MenuTypeEnum, SystemThemeEnum } from '@/enums/appEnum.ts'
import AppConfig from '@/config'
import { MenuThemeType } from '@/typings/modules/store'

const { defaultMenuWidth, defaultCustomRadius, defaultTabStyle } = AppConfig.systemSetting

export const useSettingStore = defineStore('settingStore', () => {
    const menuType = ref(MenuTypeEnum.LEFT)

    const menuOpenWidth = ref(defaultMenuWidth)
    const customRadius = ref(defaultCustomRadius)
    const tabStyle = ref(defaultTabStyle)
    const menuThemeType = ref(MenuThemeEnum.LIGHT)
    const systemThemeType = ref(SystemThemeEnum.LIGHT)

    const uniqueOpened = ref(true)
    const showProgress = ref(true) // 显示顶部进度条
    const menuOpen = ref(true) // 侧边栏状态

    const setProgress = () => {
        showProgress.value = !showProgress.value
    }

    const setMenuOpen = (open: boolean) => {
        menuOpen.value = open
    }

    const getMenuOpenWidth = computed((): string => {
        return `${menuOpenWidth.value}px` || `${defaultMenuWidth}px`
    })

    const getMenuTheme = computed((): MenuThemeType => {
        const list = AppConfig.themeList.filter((item) => item.theme === menuThemeType.value)
        if (isDark.value) {
            return AppConfig.darkMenuStyles[0]
        }
        return list[0]
    })

    const isDark = computed((): boolean => {
        return systemThemeType.value === SystemThemeEnum.DARK
    })

    return {
        menuType,
        showProgress,
        setProgress,
        menuOpen,
        setMenuOpen,
        customRadius,
        tabStyle,
        menuOpenWidth,
        getMenuOpenWidth,
        getMenuTheme,
        uniqueOpened
    }
})
