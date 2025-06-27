import { useEffect, useState } from 'react'
import { HeaderAuthButton } from '../../shared/HeaderAuthButton/HeaderAuthButton'
import { deleteCookie, getCookie } from '../../utils/cookies'
import styles from './header.module.scss'
import { Link, useNavigate } from 'react-router'
import {
    fetchAuthMe,
    fetchDeleteAuth,
    type UserData,
} from '../../api/fetchAuth'

export const Header: React.FC = () => {
    const token = getCookie('token')
    const refresh = getCookie('refresh')

    const [user, setUser] = useState<UserData | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async (token: string) => {
            try {
                const userData = await fetchAuthMe(token)

                setUser(userData)
            } catch (err) {
                console.error('Ошибка при загрузке пользователя', err)
            }
        }

        if (token) {
            fetchUser(token)
        }
    }, [user])

    const onClickLogout = async () => {
        deleteCookie('token')
        await fetchDeleteAuth(refresh)
        setUser(null)
    }

    if (!user) {
        navigate('/login')
    }

    return (
        <div className={styles.header}>
            <HeaderAuthButton variant="login" onClick={onClickLogout}>
                Выйти
            </HeaderAuthButton>

            {
                // <>
                //     <Link to="/login">
                //         <HeaderAuthButton variant="login">
                //             Войти
                //         </HeaderAuthButton>
                //     </Link>
                //     <Link to="/register">
                //         <HeaderAuthButton variant="register">
                //             Регистрация
                //         </HeaderAuthButton>
                //     </Link>
                // </>
            }
        </div>
    )
}
