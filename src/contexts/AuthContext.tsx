import { createContext, useCallback, useContext } from 'react'
import type { UserData } from '../types/user'
import { getCookie } from '../utils/cookies'
import { fetchAuthMe } from '../api/fetchAuth'
import { useFetch } from '../hooks/useFetch'

interface AuthContextType {
    user: UserData | null
    setUser: (user: UserData | null) => void
    isLoading: boolean
    error: unknown
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider ')
    }

    return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const fetchData = useCallback(async () => {
        const token = getCookie('token')
        const refresh = getCookie('refresh')

        if (token && refresh) {
            const userData = await fetchAuthMe(token)
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
