// 主布局组件
import React from 'react'
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSettingStore, useUserStore } from '@/stores'

const { Header, Sider, Content } = Layout

const MainLayout: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { collapsed, setCollapsed } = useSettingStore()
    const { userInfo, logout } = useUserStore()

    const menuItems = [
        {
            key: '/dashboard',
            icon: <UserOutlined />,
            label: '仪表盘'
        },
        {
            key: '/user/list',
            icon: <UserOutlined />,
            label: '用户管理'
        },
        {
            key: '/article/list',
            icon: <UserOutlined />,
            label: '文章管理'
        }
    ]

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const userMenu = {
        items: [
            {
                key: 'profile',
                icon: <UserOutlined />,
                label: '个人资料'
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
                onClick: handleLogout
            }
        ]
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.3)'
                }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: 0,
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ marginRight: 24 }}>
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <div style={{ cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ marginLeft: 8 }}>
                                    {userInfo?.username || '用户'}
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout