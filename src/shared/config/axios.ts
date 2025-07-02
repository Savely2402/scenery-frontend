import axios, { AxiosError, type AxiosResponse } from 'axios'
import { refreshAccessToken } from '../api'
import { getAccessToken, setAccessToken } from '../../utils/token'

interface CustomErrorResponse {
    error: string
    code?: string // token_not_valid
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
                    const data = await refreshAccessToken()

                    setAccessToken(data.access)

                    axiosInstance.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${data.access}`
                } catch (err) {
                    console.log('Refreshing token error', err)
                    throw new Error('Refreshing token error')
                }
            }
        }

        return error
    }
)
