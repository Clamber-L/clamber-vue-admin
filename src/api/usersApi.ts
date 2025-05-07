import { BaseResult } from '@/types/axios'
import { UserInfo } from '@/types/store'
import avatar from '@/assets/img/user/avatar.png'
import api from '@/utils/http'

export const UserApi = {
    login: async (data: Record<string, string>) => {
        return api.post<BaseResult>('/auth/login', data)
    },

    // 获取用户信息
    userInfo: (): Promise<BaseResult<UserInfo>> => {
        return new Promise((resolve) => {
            resolve({
                code: 200,
                message: '获取用户信息成功',
                data: {
                    id: 1,
                    name: '张三',
                    username: 'John Snow',
                    avatar,
                    email: 'art.design@gmail.com'
                }
            })
        })
    }
}
