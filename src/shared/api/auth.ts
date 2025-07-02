import type { LoginFormData, RegisterFormData } from '../../types/forms'
import { fetchData } from '../../utils/fetchData'
import { getRefreshToken } from '../../utils/token'

export interface UserAuthResponse {
    access: string
    refresh: string
}

export interface UserLogoutResponse {
    status: string
    error: string
}

export interface AccessTokenResponse {
    access: string
}

export interface RefreshTokenRequest {
    refresh: string
}

export interface User {
    id: number
    email: string
    userAgent: string
    access: string
    refresh: string
    avatar?: string
}

export async function loginUser(
    loginFormData: LoginFormData
): Promise<UserAuthResponse> {
    try {
        const data = await fetchData<UserAuthResponse, LoginFormData>({
            url: '/login/',
            method: 'POST',
            data: loginFormData,
        })

        return data
    } catch (err) {
        console.error('Login Error: ', err)
        throw new Error('Login Error')
    }
}

export async function registerUser(
    registerFormData: RegisterFormData
): Promise<UserAuthResponse> {
    try {
        const data = await fetchData<UserAuthResponse, RegisterFormData>({
            url: '/register/',
            method: 'POST',
            data: registerFormData,
        })

        return data
    } catch (err) {
        console.error('Register Error: ', err)
        throw new Error('Register Error')
    }
}

export async function fetchAuthMe(): Promise<User> {
    try {
        const data = await fetchData<User>({
            url: '/auth/me',
            method: 'GET',
        })

        return data
    } catch (err) {
        console.error('Auth Error: ', err)
        throw new Error('Auth Error')
    }
}

export async function logoutUser(): Promise<UserLogoutResponse> {
    const refreshToken = getRefreshToken() ?? ''

    try {
        const data = await fetchData<UserLogoutResponse, RefreshTokenRequest>({
            url: '/exit/',
            method: 'DELETE',
            data: {
                refresh: refreshToken,
            },
        })

        return data
    } catch (err) {
        console.error('Error while deleting user session', err)
        throw new Error('Error while deleting user session')
    }
}

export async function refreshAuthTokens(): Promise<UserAuthResponse> {
    const refreshToken = getRefreshToken() ?? ''

    try {
        const data = await fetchData<UserAuthResponse, RefreshTokenRequest>({
            url: '/token/jwt',
            method: 'POST',
            data: {
                refresh: refreshToken,
            },
        })

        return data
    } catch (err) {
        console.error('Error while getting access and refresh tokens: ', err)
        throw new Error('Error while getting access and refresh tokens')
    }
}

export async function refreshAccessToken(): Promise<AccessTokenResponse> {
    const refreshToken = getRefreshToken() ?? ''
    try {
        const data = await fetchData<AccessTokenResponse, RefreshTokenRequest>({
            url: '/token/refresh',
            method: 'POST',
            data: {
                refresh: refreshToken,
            },
        })

        return data
    } catch (err) {
        console.error('Error while getting access token: ', err)
        throw new Error('Error while getting access token')
    }
}
