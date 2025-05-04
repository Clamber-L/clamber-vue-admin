// 创建递归函数处理嵌套路由
import { MenuListType } from '@/typings/modules/meun'

/**
 * 处理路由配置,转换为菜单数据结构
 * @param r 路由配置对象
 * @param parentPath 父级路径
 * @returns 处理后的菜单项
 */
export const processRoute = (r: MenuListType, parentPath = ''): MenuListType => {
    // 构建完整路径

    let currentPath = ''
    if (r.path) {
        if (r.meta?.isIframe) {
            // 当 isIframe 为 true，直接使用原始路径
            currentPath = r.path
        } else if (parentPath) {
            // 拼接 parentPath 和 r.path，并规范化路径
            currentPath = `${parentPath}/${r.path}`.replace(/\/+/g, '/')
        } else {
            // 仅使用 r.path
            currentPath = r.path
        }
    }

    return {
        id: r.id ?? Math.random(), // 使用空值合并运算符
        name: r.name,
        path: currentPath,
        component: r.component,
        meta: r.meta ?? {}, // 使用空值合并运算符
        children: Array.isArray(r.children)
            ? r.children.map((child) => processRoute(child, currentPath))
            : []
    }
}

/**
 * 保存 iframe 路由到 sessionStorage 中
 * @param list iframe 路由列表
 */
export const saveIframeRoutes = (list: MenuListType[]): void => {
    if (list.length > 0) {
        sessionStorage.setItem('iframeRoutes', JSON.stringify(list))
    }
}

// 获取 iframe 路由
export const getIframeRoutes = () => {
    return JSON.parse(sessionStorage.getItem('iframeRoutes') || '[]')
}
