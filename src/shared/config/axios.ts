import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios'
import { refreshAccessToken } from '../api'
import { getAccessToken, setAccessToken } from '../../utils/token'

// Расширяем стандартный AxiosRequestConfig
interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

interface CustomErrorResponse {
    error: string
    code?: string
}

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response
    },
    async (error: AxiosError<CustomErrorResponse>): Promise<AxiosError> => {
        const originalRequest = error.config as RetryableAxiosRequestConfig
        if (
            error.response &&
            !originalRequest._retry &&
            error.code === 'token_not_valid' &&
            error.response.status === 401
        ) {
            originalRequest._retry = true

            try {
                const data = await refreshAccessToken()
                setAccessToken(data.access)

                console.log('Access', data.access)

                axiosInstance.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${data.access}`

                return axiosInstance(originalRequest)
            } catch (err) {
                console.log('Refreshing token error', err)
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)
