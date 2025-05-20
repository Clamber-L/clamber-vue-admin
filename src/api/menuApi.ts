import { fourDotsSpinnerSvg } from '@/assets/svg/loading'
import { MenuListType } from '@/types/menu'
import { processRoute } from '@/utils/menu'
import { ElLoading } from 'element-plus'
import api from '@/utils/http'
import { BaseResult } from '@/types/axios'
import { ApiStatus } from '@/utils/http/status.ts'

// 菜单接口
export const menuService = {
    // 获取菜单列表，模拟网络请求
    async getMenuList(
        delay: number = 300
    ): Promise<{ menuList: MenuListType[]; closeLoading: () => void }> {
        const loading = ElLoading.service({
            lock: true,
            background: 'rgba(0, 0, 0, 0)',
            svg: fourDotsSpinnerSvg,
            svgViewBox: '0 0 40 40'
        })

        // 获取到的菜单数据
        const menuList = await api.get<BaseResult<MenuListType[]>>('/auth/permission_menu')
        if (menuList.code === ApiStatus.success) {
            // 处理后的菜单数据
            const processedMenuList: MenuListType[] = menuList.data.map((route) =>
                processRoute(route)
            )

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        menuList: processedMenuList,
                        closeLoading: () => loading.close()
                    })
                }, delay)
            })
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    menuList: [],
                    closeLoading: () => loading.close()
                })
            }, delay)
        })
    }
}
