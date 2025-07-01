import { useCallback } from 'react'
import { getCookie } from '../utils/cookies'
import { fetchAuthMe } from '../api/fetchAuth'
import { useFetch } from '../hooks/useFetch'
import type { UserData } from '../types/user'
import { AuthContext } from '../contexts/AuthContext'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const fetchData = useCallback(async () => {
        const token = getCookie('token')
        const refresh = getCookie('refresh')

        if (token && refresh) {
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
    } = useFetch<UserData | null>(fetchData)

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    )
}
