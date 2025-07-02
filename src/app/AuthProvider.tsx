import { useCallback } from 'react'
import { fetchAuthMe } from '../shared/api'
import { useFetch } from '../hooks/useFetch'
import type { User } from '../shared/api'
import { AuthContext } from '../contexts/AuthContext'
import { getAccessToken, getRefreshToken } from '../utils/token'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const fetchData = useCallback(async () => {
        const accessToken = getAccessToken()
        const refreshToken = getRefreshToken()

        if (accessToken && refreshToken) {
            const userData = await fetchAuthMe()
            return userData
        }
        return null
    }, [])

    const {
        data: user,
        setData: setUser,
        isLoading,
        error,
    } = useFetch<User | null>(fetchData)

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    )
}
