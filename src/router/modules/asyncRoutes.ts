import { MenuListType } from '@/types/menu'
import { RoutesAlias } from '@/router/modules/routesAlias.ts'
import { WEB_LINKS } from '@/utils/links.ts'

/**
 * 菜单列表、异步路由
 *
 * 支持两种模式:
 * 1. 前端静态配置 - 直接使用本文件中定义的路由配置
 * 2. 后端动态配置 - 后端返回菜单数据，前端解析生成路由
 *
 * 菜单标题（title）:
 */
export const asyncRoutes: MenuListType[] = [
    {
        id: 1,
        name: 'Dashboard',
        path: '/dashboard',
        component: RoutesAlias.Home,
        meta: {
            title: '仪表盘',

            icon: '&#xe721;',
            keepAlive: false
        },
        children: [
            {
                id: 101,
                path: 'console',
                name: 'Console',
                component: RoutesAlias.Dashboard,
                meta: {
                    title: '工作台',
                    keepAlive: true
                }
            },
            {
                id: 102,
                path: 'analysis',
                name: 'Analysis',
                component: RoutesAlias.Analysis,
                meta: {
                    title: '分析页',
                    keepAlive: true
                }
            },
            {
                id: 103,
                path: 'ecommerce',
                name: 'Ecommerce',
                component: RoutesAlias.Ecommerce,
                meta: {
                    title: '电子商务',
                    keepAlive: true
                    // showTextBadge: 'new'
                }
            }
        ]
    },
    {
        id: 5,
        path: '/widgets',
        name: 'Widgets',
        component: RoutesAlias.Home,
        meta: {
            title: '组件中心',
            icon: '&#xe81a;',
            keepAlive: false
        },
        children: [
            {
                id: 503,
                path: 'icon-list',
                name: 'IconList',
                component: RoutesAlias.IconList,
                meta: {
                    title: 'Icon 图标',
                    keepAlive: true
                }
            },
            {
                id: 504,
                path: 'icon-selector',
                name: 'IconSelector',
                component: RoutesAlias.IconSelector,
                meta: {
                    title: '图标选择器',
                    keepAlive: true
                }
            },
            {
                id: 505,
                path: 'image-crop',
                name: 'ImageCrop',
                component: RoutesAlias.ImageCrop,
                meta: {
                    title: '图像裁剪',
                    keepAlive: true
                }
            },
            {
                id: 506,
                path: 'excel',
                name: 'Excel',
                component: RoutesAlias.Excel,
                meta: {
                    title: 'Excel 导入导出',
                    keepAlive: true
                }
            },
            {
                id: 507,
                path: 'video',
                name: 'Video',
                component: RoutesAlias.Video,
                meta: {
                    title: '视频播放器',
                    keepAlive: true
                }
            },
            {
                id: 508,
                path: 'count-to',
                name: 'CountTo',
                component: RoutesAlias.CountTo,
                meta: {
                    title: '数字滚动',
                    keepAlive: false
                }
            },
            {
                id: 509,
                path: 'wang-editor',
                name: 'WangEditor',
                component: RoutesAlias.WangEditor,
                meta: {
                    title: '富文本编辑器',
                    keepAlive: true
                }
            },
            {
                id: 510,
                path: 'watermark',
                name: 'Watermark',
                component: RoutesAlias.Watermark,
                meta: {
                    title: '水印',
                    keepAlive: true
                }
            },
            {
                id: 511,
                path: 'context-menu',
                name: 'ContextMenu',
                component: RoutesAlias.ContextMenu,
                meta: {
                    title: '右键菜单',
                    keepAlive: true
                }
            },
            {
                id: 512,
                path: 'qrcode',
                name: 'Qrcode',
                component: RoutesAlias.Qrcode,
                meta: {
                    title: '二维码',
                    keepAlive: true
                }
            },
            {
                id: 513,
                path: 'drag',
                name: 'Drag',
                component: RoutesAlias.Drag,
                meta: {
                    title: '拖拽',
                    keepAlive: true
                }
            },
            {
                id: 514,
                path: 'text-scroll',
                name: 'TextScroll',
                component: RoutesAlias.TextScroll,
                meta: {
                    title: '文字滚动',
                    keepAlive: true
                }
            },
            {
                id: 515,
                path: 'fireworks',
                name: 'Fireworks',
                component: RoutesAlias.Fireworks,
                meta: {
                    title: '礼花',
                    keepAlive: true
                    // showTextBadge: 'Hot'
                }
            },
            {
                id: 516,
                path: '/outside/iframe/elementui',
                name: 'ElementUI',
                component: '',
                meta: {
                    title: '组件总览',
                    keepAlive: false,
                    link: 'https://element-plus.org/zh-CN/component/overview.html',
                    isIframe: true
                }
            }
        ]
    },
    {
        id: 126,
        path: '/template',
        name: 'Template',
        component: RoutesAlias.Home,
        meta: {
            title: '模板中心',
            icon: '&#xe860;',
            keepAlive: false
        },
        children: [
            {
                id: 12602,
                path: 'cards',
                name: 'Cards',
                component: RoutesAlias.Cards,
                meta: {
                    title: '卡片',
                    keepAlive: false
                }
            },
            {
                id: 12603,
                path: 'banners',
                name: 'Banners',
                component: RoutesAlias.Banners,
                meta: {
                    title: '横幅',
                    keepAlive: false
                }
            },
            {
                id: 12604,
                path: 'charts',
                name: 'Charts',
                component: RoutesAlias.Charts,
                meta: {
                    title: '图表',
                    keepAlive: false
                }
            },
            {
                id: 12609,
                path: 'map',
                name: 'Map',
                component: RoutesAlias.Map,
                meta: {
                    title: '地图',
                    keepAlive: true
                    // showTextBadge: 'new'
                }
            },
            {
                id: 12601,
                path: 'chat',
                name: 'Chat',
                component: RoutesAlias.Chat,
                meta: {
                    title: '聊天',
                    keepAlive: true
                }
            },
            {
                id: 12605,
                path: 'calendar',
                name: 'Calendar',
                component: RoutesAlias.Calendar,
                meta: {
                    title: '日历',
                    keepAlive: true
                }
            },
            {
                id: 12622,
                path: 'pricing',
                name: 'Pricing',
                component: RoutesAlias.Pricing,
                meta: {
                    title: '定价',
                    keepAlive: true,
                    isHideTab: true
                }
            }
        ]
    },
    {
        id: 4,
        path: '/article',
        name: 'Article',
        component: RoutesAlias.Home,
        meta: {
            title: '文章管理',
            icon: '&#xe7ae;',
            keepAlive: true
        },
        children: [
            {
                id: 202,
                path: 'article-list',
                name: 'ArticleList',
                component: RoutesAlias.ArticleList,
                meta: {
                    title: '文章列表',
                    keepAlive: true,
                    authList: [
                        {
                            id: 2021,
                            title: '新增',
                            auth_mark: 'add'
                        },
                        {
                            id: 2022,
                            title: '编辑',
                            auth_mark: 'edit'
                        }
                    ]
                }
            },

            {
                id: 204,
                path: 'detail',
                name: 'ArticleDetail',
                component: RoutesAlias.ArticleDetail,
                meta: {
                    title: '文章详情',
                    isHide: true,
                    keepAlive: true
                }
            },
            {
                id: 205,
                path: 'comment',
                name: 'Comment',
                component: RoutesAlias.Comment,
                meta: {
                    title: '留言管理',
                    keepAlive: true
                }
            },
            {
                id: 201,
                path: 'article-publish',
                name: 'ArticlePublish',
                component: RoutesAlias.ArticlePublish,
                meta: {
                    title: '文章发布',
                    keepAlive: true,
                    authList: [
                        {
                            id: 2010,
                            title: '发布',
                            auth_mark: 'article/article-publish/add'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 2,
        name: 'User',
        path: '/user',
        component: RoutesAlias.Home,
        meta: {
            title: '用户管理',
            icon: '&#xe86e;',
            keepAlive: false
        },
        children: [
            {
                id: 301,
                path: 'account',
                name: 'Account',
                component: RoutesAlias.Account,
                meta: {
                    title: '账号管理',
                    keepAlive: true
                }
            },
            {
                id: 302,
                path: 'department',
                name: 'Department',
                component: RoutesAlias.Department,
                meta: {
                    title: '部门管理',
                    keepAlive: false
                }
            },
            {
                id: 303,
                path: 'role',
                name: 'Role',
                component: RoutesAlias.Role,
                meta: {
                    title: '角色权限',
                    keepAlive: true
                }
            },
            {
                id: 304,
                path: 'user',
                name: 'UserCenter',
                component: RoutesAlias.UserCenter,
                meta: {
                    title: '个人中心',
                    isHide: true,
                    keepAlive: true,
                    isHideTab: true
                }
            }
        ]
    },
    {
        id: 3,
        path: '/menu',
        name: 'Menu',
        component: RoutesAlias.Home,
        meta: {
            title: '菜单管理',
            icon: '&#xe8a4;',
            keepAlive: false
        },
        children: [
            {
                id: 401,
                path: 'menu',
                name: 'Menus',
                component: RoutesAlias.Menu,
                meta: {
                    title: '菜单权限',
                    icon: '&#xe8a4;',
                    keepAlive: true,
                    authList: [
                        {
                            id: 4011,
                            title: '新增',
                            auth_mark: 'add'
                        },
                        {
                            id: 4012,
                            title: '编辑',
                            auth_mark: 'edit'
                        },
                        {
                            id: 4013,
                            title: '删除',
                            auth_mark: 'delete'
                        }
                    ]
                }
            },
            {
                id: 411,
                path: 'permission',
                name: 'Permission',
                component: RoutesAlias.Permission,
                meta: {
                    title: '权限控制',
                    icon: '&#xe831;',
                    // showTextBadge: 'new',
                    keepAlive: true,
                    authList: [
                        {
                            id: 4111,
                            title: '新增',
                            auth_mark: 'add'
                        },
                        {
                            id: 4112,
                            title: '编辑',
                            auth_mark: 'edit'
                        },
                        {
                            id: 4113,
                            title: '删除',
                            auth_mark: 'delete'
                        }
                    ]
                }
            },
            {
                id: 402,
                path: 'nested',
                name: 'Nested',
                component: '',
                meta: {
                    title: '嵌套菜单',
                    icon: '&#xe676;',
                    keepAlive: true
                },
                children: [
                    {
                        id: 40201,
                        path: 'menu1',
                        name: 'NestedMenu1',
                        component: RoutesAlias.NestedMenu1,
                        meta: {
                            title: '菜单1',
                            icon: '&#xe676;',
                            keepAlive: true
                        }
                    },
                    {
                        id: 40202,
                        path: 'menu2',
                        name: 'NestedMenu2',
                        component: '',
                        meta: {
                            title: '菜单2',
                            icon: '&#xe676;',
                            keepAlive: true
                        },
                        children: [
                            {
                                id: 4020201,
                                path: 'menu2-1',
                                name: 'NestedMenu2-1',
                                component: RoutesAlias.NestedMenu21,
                                meta: {
                                    title: '菜单2-1',
                                    icon: '&#xe676;',
                                    keepAlive: true
                                }
                            }
                        ]
                    },
                    {
                        id: 40203,
                        path: 'menu3',
                        name: 'NestedMenu3',
                        component: '',
                        meta: {
                            title: '菜单3',
                            icon: '&#xe676;',
                            keepAlive: true
                        },
                        children: [
                            {
                                id: 4020301,
                                path: 'menu3-1',
                                name: 'NestedMenu3-1',
                                component: RoutesAlias.NestedMenu31,
                                meta: {
                                    title: '菜单3-1',
                                    icon: '&#xe676;',
                                    keepAlive: true
                                }
                            },
                            {
                                id: 4020302,
                                path: 'menu3-2',
                                name: 'NestedMenu3-2',
                                component: '',
                                meta: {
                                    title: '菜单3-2',
                                    icon: '&#xe676;',
                                    keepAlive: true
                                },
                                children: [
                                    {
                                        id: 402030201,
                                        path: 'menu3-2-1',
                                        name: 'NestedMenu3-2-1',
                                        component: RoutesAlias.NestedMenu321,
                                        meta: {
                                            title: '菜单3-2-1',
                                            icon: '&#xe676;',
                                            keepAlive: true
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 18,
        path: '/result',
        name: 'Result',
        component: RoutesAlias.Home,
        meta: {
            title: '结果页面',
            icon: '&#xe715;',
            keepAlive: false
        },
        children: [
            {
                id: 401,
                path: 'success',
                name: 'Success',
                component: RoutesAlias.Success,
                meta: {
                    title: '成功页',
                    keepAlive: true
                }
            },
            {
                id: 402,
                path: 'fail',
                name: 'Fail',
                component: RoutesAlias.Fail,
                meta: {
                    title: '失败页',
                    keepAlive: true
                }
            }
        ]
    },
    {
        id: 8,
        path: '/exception',
        name: 'Exception',
        component: RoutesAlias.Home,
        meta: {
            title: '异常页面',
            icon: '&#xe820;',
            keepAlive: false
        },
        children: [
            {
                id: 801,
                path: '403',
                name: '403',
                component: RoutesAlias.Exception403,
                meta: {
                    title: '403',
                    keepAlive: true
                }
            },
            {
                id: 802,
                path: '404',
                name: '404',
                component: RoutesAlias.Exception404,
                meta: {
                    title: '404',
                    keepAlive: true
                }
            },
            {
                id: 803,
                path: '500',
                name: '500',
                component: RoutesAlias.Exception500,
                meta: {
                    title: '500',
                    keepAlive: true
                }
            }
        ]
    },
    {
        id: 9,
        path: '/system',
        name: 'System',
        component: RoutesAlias.Home,
        meta: {
            title: '系统管理',
            icon: '&#xe7b9;',
            keepAlive: false
        },
        children: [
            {
                id: 901,
                path: 'setting',
                name: 'Setting',
                component: RoutesAlias.Setting,
                meta: {
                    title: '系统设置',
                    keepAlive: true
                }
            },
            {
                id: 902,
                path: 'api',
                name: 'Api',
                component: RoutesAlias.Api,
                meta: {
                    title: 'API管理',
                    keepAlive: true
                }
            },
            {
                id: 903,
                path: 'log',
                name: 'Log',
                component: RoutesAlias.Log,
                meta: {
                    title: '系统日志',
                    keepAlive: true
                }
            }
        ]
    },
    {
        id: 10,
        path: '/safeguard',
        name: 'Safeguard',
        component: RoutesAlias.Home,
        meta: {
            title: '运维管理',
            icon: '&#xe816;',
            keepAlive: false
        },
        children: [
            {
                id: 1010,
                path: 'server',
                name: 'Server',
                component: RoutesAlias.Server,
                meta: {
                    title: '服务器管理',
                    keepAlive: true
                }
            }
        ]
    },
    {
        id: 12,
        name: '',
        path: '',
        component: RoutesAlias.Home,
        meta: {
            title: '帮助中心',
            icon: '&#xe719;',
            keepAlive: false
        },
        children: [
            {
                id: 1101,
                path: '',
                name: 'Document',
                meta: {
                    title: '官方文档',
                    link: WEB_LINKS.DOCS,
                    isIframe: false,
                    keepAlive: false
                }
            }
        ]
    },
    // 一级菜单
    {
        id: 11912,
        name: 'ChangeLog',
        path: '/log/changeLog',
        component: '/log/ChangeLog',
        meta: {
            title: '更新日志',
            icon: '&#xe712;',
            keepAlive: false,
            isInMainContainer: true
        }
    }
]
