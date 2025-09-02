// React Router 配置
import React, { Suspense } from 'react'
import {
    createBrowserRouter,
    createHashRouter,
    Navigate,
    RouteObject
} from 'react-router-dom'
import { Spin } from 'antd'

// 懒加载组件
const Layout = React.lazy(() => import('@/components/Layout'))
const Login = React.lazy(() => import('@/pages/Login'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const UserList = React.lazy(() => import('@/pages/User/UserList'))
const ArticleList = React.lazy(() => import('@/pages/Article/ArticleList'))
const NotFound = React.lazy(() => import('@/pages/Exception/404'))

// 路由配置
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <Login />
            </Suspense>
        )
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <Layout />
            </Suspense>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: 'user/list',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <UserList />
                    </Suspense>
                )
            },
            {
                path: 'article/list',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <ArticleList />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <NotFound />
            </Suspense>
        )
    }
]

// 创建路由器
export const router = createHashRouter(routes)

// 路由守卫 Hook
export const useAuthGuard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { isLogin } = useUserStore()

    React.useEffect(() => {
        // 检查登录状态
        if (!isLogin && location.pathname !== '/login') {
            navigate('/login', { replace: true })
        }
    }, [isLogin, location.pathname, navigate])
}