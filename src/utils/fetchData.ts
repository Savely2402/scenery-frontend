import { type AxiosResponse, type AxiosRequestConfig } from 'axios'
import { axiosInstance } from '../shared/config'

export async function fetchData<Response, Request = unknown>(
    request: AxiosRequestConfig<Request>
): Promise<Response> {
    try {
        const response: AxiosResponse<Response> = await axiosInstance.request(
            request
        )
        const data: Response = response.data
        return data
    } catch {
        throw new Error('Request Error')
    }
}
