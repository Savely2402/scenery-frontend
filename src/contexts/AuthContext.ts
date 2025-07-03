import { createContext } from 'react'
import type { User } from '../shared/api'

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    isLoading: boolean
    error: unknown
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
