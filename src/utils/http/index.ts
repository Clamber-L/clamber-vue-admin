import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/user.ts'
import { ElMessage } from 'element-plus'
import EmojiText from '@/utils/emojo.ts'

const axiosInstance = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    transformRequest: [(data) => JSON.stringify(data)],
    validateStatus: (status) => status >= 200 && status < 300,
    headers: {
        post: { 'Content-Type': 'application/json' },
        get: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    },
    transformResponse: [
        (data, headers) => {
            const contentType = headers['content-type']
            if (contentType && contentType.includes('application/json')) {
                return JSON.parse(data)
            }
            return data
        }
    ]
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    (req: InternalAxiosRequestConfig) => {
        const { accessToken } = useUserStore()

        if (accessToken) {
            req.headers.set({
                'Content-type': 'application/json',
                Authorization: accessToken
            })
        }
        return req
    },
    (error: any) => {
        ElMessage.error(`服务器异常,${EmojiText[500]}`)
        return Promise.reject(error)
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: any) => {
        if (axios.isCancel(error)) {
            console.log(`repeated request: ${error.message}`)
        } else {
            const errorMessage = error.response?.data.message
            ElMessage.error(
                errorMessage
                    ? `${errorMessage} ${EmojiText[500]}`
                    : `请求超时或服务器异常！${EmojiText[500]}`
            )
        }
        return Promise.reject(error)
    }
)

async function request<T = any>(config: AxiosRequestConfig) {
    if (config.method?.toUpperCase() === 'POST' || config.method?.toUpperCase() === 'PUT') {
        // 如果已经有 data，则保留原有的 data
        if (config.params && !config.data) {
            config.data = config.params
            config.params = undefined
        }
    }
    try {
        const result = await axiosInstance.request<T>({ ...config })
        return result.data
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // 可以在这里处理 Axios 错误
        }
        return Promise.reject(error)
    }
}

// API 方法集合
const api = {
    get<T>(config: AxiosRequestConfig): Promise<T> {
        return request({ ...config, method: 'GET' }) // GET 请求
    },
    post<T>(config: AxiosRequestConfig): Promise<T> {
        return request({ ...config, method: 'POST' }) // POST 请求
    },
    put<T>(config: AxiosRequestConfig): Promise<T> {
        return request({ ...config, method: 'PUT' }) // PUT 请求
    },
    del<T>(config: AxiosRequestConfig): Promise<T> {
        return request({ ...config, method: 'DELETE' }) // DELETE 请求
    }
}

export default api
