import api from '@/utils/http'
import { SettingResponse } from '@/api/model/settingModel.ts'
import { BaseResult } from '@/types/axios'

export const SettingApi = {
    loginImage: async () => {
        return api.get<BaseResult<SettingResponse>>('/setting/login_image')
    }
}
