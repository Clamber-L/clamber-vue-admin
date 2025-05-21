import { MenuListType } from '@/types/menu'
import api from '@/utils/http'
import { BaseResult } from '@/types/axios'

// 菜单接口
export const menuService = {
    // 获取菜单列表，模拟网络请求
    async getMenuList() {
        // 获取到的菜单数据
        return api.get<BaseResult<MenuListType[]>>('/auth/permission_menu')
    }
}
