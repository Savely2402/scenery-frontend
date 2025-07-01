import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const PrivateRouter = () => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to={'login'} />
    }

    return <Outlet />
}
