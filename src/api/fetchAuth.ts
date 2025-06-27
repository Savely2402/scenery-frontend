import axios, { type AxiosResponse } from 'axios'
import type { LoginFormData, RegisterFormData } from '../types/forms'
import type { UserAuthResponse, UserData } from '../types/user'

export async function fetchAuthLogin(
    loginFormData: LoginFormData
): Promise<UserAuthResponse> {
    try {
        const response: AxiosResponse<UserAuthResponse> = await axios.post(
            'localhost:8000/login',
            loginFormData
        )

        const data: UserAuthResponse = response.data

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
        const response: AxiosResponse<UserAuthResponse> = await axios.post(
            'localhost:8000/register',
            loginFormData
        )

        const data: UserAuthResponse = response.data

        return data
    } catch (err) {
        console.error('Ошибка при регистрации: ', err)
        throw new Error('Ошибка при регистрации')
    }
}

export async function fetchAuthMe(token: string): Promise<UserData> {
    try {
        const response: AxiosResponse<UserData> = await axios.get(
            'localhost:8000/auth/me',
            {
                headers: {
                    Authorization: token,
                },
            }
        )

        const data: UserData = response.data

        return data
    } catch (err) {
        console.error('Ошибка авторизации: ', err)
        throw new Error('Ошибка авторизации')
    }
}

export async function fetchDeleteAuth(
    refresh_token: string | undefined
): Promise<{ status: string } | { error: string }> {
    try {
        const response: AxiosResponse<{ status: string } | { error: string }> =
            await axios.delete('localhost:8000/exit', {
                data: {
                    refresh: refresh_token,
                },
            })

        const data: { status: string } | { error: string } = response.data

        return data
    } catch (err) {
        console.error('Ошибка авторизации: ', err)
        throw new Error('Ошибка авторизации')
    }
}
