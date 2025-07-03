import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export const PrivateRouter = () => {
    const { user, isLoading, error } = useAuth()

    if ((!user && !isLoading) || error) {
        console.log(user, isLoading, error)
        return <Navigate to={'/login'} />
    }

    return <Outlet />
}
