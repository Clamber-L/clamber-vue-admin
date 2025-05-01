import { SystemThemeEnum } from '@/enums/appEnum'
import { MenuThemeType, SystemThemeTypes } from '@/typings/modules/store'

// 主题设置
export interface ThemeSetting {
  name: string
  theme: SystemThemeEnum
  color: string[]
  leftLineColor: string
  rightLineColor: string
}

// 系统配置
export interface SystemConfig {
  elementPlusTheme: { primary: string }
  systemInfo: {
    name: string
    login: { username: string; password: string }
  }
  systemThemeStyles: SystemThemeTypes
  settingThemeList: ThemeSetting[]
  themeList: MenuThemeType[]
  darkMenuStyles: MenuThemeType[]
  systemMainColor: readonly string[]
  systemSetting: {
    defaultMenuWidth: number
    defaultCustomRadius: string
    defaultTabStyle: string
  }
}
