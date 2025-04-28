import { MenuListType } from '@/typings/modules/meun'

export const useMenuStore = defineStore('meunStore', () => {
    const menuList = ref<MenuListType[]>([])
    const menuWidth = ref('')

    const setMenuList = (list: MenuListType[]) => {
        menuList.value = list
    }
    const setMenuWidth = (width: string) => {
        menuWidth.value = width
    }

    return {
        menuList,
        menuWidth,
        setMenuList,
        setMenuWidth
    }
})
