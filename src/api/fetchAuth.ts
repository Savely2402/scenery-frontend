import { type AxiosResponse } from 'axios'
import type { LoginFormData, RegisterFormData } from '../types/forms'
import type { UserAuthResponse, UserData } from '../types/user'
import { getCookie } from '../utils/cookies'
import { axiosInstance } from '../axios'

export async function fetchAuthLogin(
    loginFormData: LoginFormData
): Promise<UserAuthResponse> {
    try {
        const response: AxiosResponse<UserAuthResponse> =
            await axiosInstance.post('localhost:8000/login', loginFormData)

        const data: UserAuthResponse = response.data

        console.log(data)

        return data
    } catch (err) {
        console.error('Ошибка при входе: ', err)
        throw new Error('Ошибка при входе')
    }
}

export async function fetchAuthRegister(
    loginFormData: RegisterFormData
): Promise<UserAuthResponse> {
    try {
        const response: AxiosResponse<UserAuthResponse> =
            await axiosInstance.post('localhost:8000/register', loginFormData)

        const data: UserAuthResponse = response.data

        console.log(data)

        return data
    } catch (err) {
        console.error('Ошибка при регистрации: ', err)
        throw new Error('Ошибка при регистрации')
    }
}

export async function fetchAuthMe(): Promise<UserData> {
    try {
        const response: AxiosResponse<UserData> = await axiosInstance.get(
            'localhost:8000/auth/me',
            {}
        )

        const data: UserData = response.data

        console.log(data)

        return data
    } catch (err) {
        console.error('Ошибка авторизации: ', err)
        throw new Error('Ошибка авторизации')
    }
}

export async function fetchDeleteAuth(): Promise<
    { status: string } | { error: string }
> {
    const refresh_token = getCookie('refresh')

    try {
        const response: AxiosResponse<{ status: string } | { error: string }> =
            await axiosInstance.delete('localhost:8000/exit', {
                data: {
                    refresh: refresh_token,
                },
            })

        const data: { status: string } | { error: string } = response.data

        console.log('Fetch delete auth: ', data)

        return data
    } catch (err) {
        console.error('Ошибка запроса на удаление токена: ', err)
        throw new Error('Ошибка запроса на удаление токена')
    }
}

export async function fetchRefreshTokenBoth(): Promise<
    { token: string } | { refresh: string }
> {
    const refresh_token = getCookie('refresh')
    try {
        const response: AxiosResponse<{ token: string } | { refresh: string }> =
            await axiosInstance.post('localhost:8000/token/jwt/', {
                data: {
                    refresh: refresh_token,
                },
            })

        const data: { token: string } | { refresh: string } = response.data

        console.log('New tokens: ', data)

        return data
    } catch (err) {
        console.error('Ошибка получения токенов: ', err)
        throw new Error('Ошибка получения токенов')
    }
}

export async function fetchRefreshTokenAccess(): Promise<{ token: string }> {
    const refresh_token = getCookie('refresh')
    try {
        const response: AxiosResponse<{ token: string }> =
            await axiosInstance.post('localhost:8000/token/refresh/', {
                data: {
                    refresh: refresh_token,
                },
            })

        const data: { token: string } = response.data

        console.log('New access token: ', data)

        return data
    } catch (err) {
        console.error('Ошибка получения токена: ', err)
        throw new Error('Ошибка получения токена')
    }
}
