import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export const PrivateRouter = () => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to={'auth'} />
    }

    return <Outlet />
}
