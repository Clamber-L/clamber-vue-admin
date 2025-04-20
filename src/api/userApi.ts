import { BaseResult } from '@/typings/modules/axios'
import api from '@/utils/http'

export const UserApi = {
    login: async (body: Record<string, any>): Promise<BaseResult<string>> => {
        console.log(body)
        return api.post<BaseResult<string>>({
            url: '/auth/login',
            data: body
        })
    }
}
