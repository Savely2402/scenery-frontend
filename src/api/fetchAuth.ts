import axios, { type AxiosResponse } from 'axios'
import type { LoginFormData, RegisterFormData } from '../features/types/forms'

interface AuthResponse {
    access: string
    refresh: string
}

export interface UserData {
    id: number
    email: string
    userAgent: string
    access: string
    refresh: string
}

export async function fetchAuthLogin(
    loginFormData: LoginFormData
): Promise<AuthResponse> {
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(
            'localhost:8000/login',
            loginFormData
        )

        const data: AuthResponse = response.data

        return data
    } catch (err) {
        console.error('Ошибка при входе: ', err)
        throw new Error('Ошибка при входе')
    }
}

export async function fetchAuthRegister(
    loginFormData: RegisterFormData
): Promise<AuthResponse> {
    try {
        const response: AxiosResponse<AuthResponse> = await axios.post(
            'localhost:8000/register',
            loginFormData
        )

        const data: AuthResponse = response.data

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
