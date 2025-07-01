import axios, { AxiosError, type AxiosResponse } from 'axios'
import { fetchRefreshTokenAccess } from './api/fetchAuth'
import { getCookie, setCookie } from './utils/cookies'

interface CustomErrorResponse {
    error: string
    code?: string // token_not_valid
}

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
})

axiosInstance.interceptors.request.use((config) => {
    const token = getCookie('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response
    },
    async (error: AxiosError<CustomErrorResponse>): Promise<AxiosError> => {
        const originalRequest = error.config

        if (error.response && originalRequest) {
            if (
                error.response &&
                error.response.data.code === 'token_not_valid' &&
                error.response.status === 401
            ) {
                try {
                    const data = await fetchRefreshTokenAccess()

                    setCookie('accessToken', data.token)

                    axiosInstance.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${data.token}`
                } catch (err) {
                    console.log('Ошибка обновления токена', err)
                    throw new Error('Ошибка получения нового токена')
                }
            }
        }

        return error
    }
)
