// HTTP 请求封装
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

// API 响应类型
interface ApiResponse<T = any> {
    code: number
    data: T
    message: string
}

// 创建 axios 实例
const api: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 添加 token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const { code, message: msg, data } = response.data

        if (code === 200) {
            return response.data
        } else {
            message.error(msg || '请求失败')
            return Promise.reject(new Error(msg))
        }
    },
    (error) => {
        if (error.response?.status === 401) {
            message.error('登录已过期，请重新登录')
            // 清除登录状态
            localStorage.removeItem('token')
            window.location.href = '/login'
        } else {
            message.error(error.message || '网络错误')
        }
        return Promise.reject(error)
    }
)

// 请求方法封装
export const http = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return api.get(url, config)
    },

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return api.post(url, data, config)
    },

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return api.put(url, data, config)
    },

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return api.delete(url, config)
    }
}

export default api