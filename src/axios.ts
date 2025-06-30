import axios, { AxiosError, type AxiosResponse } from 'axios'

interface CustomErrorResponse {
    error: string
    code?: string // token_not_valid
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
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
                return error
            }
        }

        return error
    }
)
