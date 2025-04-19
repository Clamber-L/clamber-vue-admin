import { BaseResult } from '@/typings/modules/axios'
import api from '@/utils/http'

export const UserApi = {
    login: async (options: { body: string }): Promise<BaseResult<string>> => {
        return api.get<BaseResult<string>>({
            url: '/user/login',
            data: options.body
        })
    }
}
