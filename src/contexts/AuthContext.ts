import { createContext } from 'react'
import type { UserData } from '../types/user'

interface AuthContextType {
    user: UserData | null
    setUser: (user: UserData | null) => void
    isLoading: boolean
    error: unknown
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
