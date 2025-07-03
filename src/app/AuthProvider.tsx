import { useCallback } from 'react'
import { fetchAuthMe } from '../shared/api'
import { useFetch } from '../hooks/useFetch'
import type { User } from '../shared/api'
import { AuthContext } from '../contexts/AuthContext'
import { getRefreshToken } from '../utils/token'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const fetchData = useCallback(async () => {
        const refreshToken = getRefreshToken()

        if (refreshToken) {
            try {
                const userData = await fetchAuthMe()
                console.log(userData)
                return userData
            } catch (err) {
                console.log('Error', err)
            }
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
