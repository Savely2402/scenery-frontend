export interface UserAuthResponse {
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
