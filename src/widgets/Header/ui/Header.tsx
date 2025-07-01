import { useEffect, useState } from 'react'
import { Input, Layout, Space, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { deleteCookie, getCookie } from '../../../utils/cookies'
import styles from './header.module.scss'
import { Link, useNavigate } from 'react-router'
import { fetchAuthMe, fetchDeleteAuth } from '../../../api/fetchAuth'
import { type UserData } from '../../../types/user'
//import { Input } from '../../../shared/Input/ui'
import userIcon from '../../../assets/User.svg'
import logoIcon from '../../../assets/logoMark.svg'

const { Header: HomeHeader } = Layout
const { Text } = Typography

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

    const onClickLogin = () => {
        navigate('/login')
    }

    const onClickHome = () => {
        navigate('home')
    }

    const search = () => {}

    // if (!user) {
    //     navigate('/login')
    // }

    return (
        <HomeHeader className={styles.header}>
            <div className={styles.logo}>
                <Space size={'middle'} align="center">
                    <img src={logoIcon} className={styles.logoMark} />
                    <Text
                        strong
                        className={styles.title}
                        onClick={onClickHome}
                        style={{ cursor: 'pointer' }}
                    >
                        Scenery
                    </Text>
                </Space>
            </div>
            <Input
                className={styles.searchInput}
                addonBefore={<SearchOutlined className={styles.searchIcon} />}
                placeholder="Search"
                onChange={search}
            />
            <div className={styles.right}>
                <Space size={'middle'} align="center">
                    {user ? (
                        <>
                            <Text
                                onClick={onClickLogout}
                                style={{ cursor: 'pointer' }}
                            >
                                Logout
                            </Text>
                            <img src={userIcon} className={styles.userIcon} />
                        </>
                    ) : (
                        <>
                            <Text
                                onClick={onClickLogin}
                                style={{ cursor: 'pointer' }}
                            >
                                Login
                            </Text>
                            <img src={userIcon} className={styles.userIcon} />
                        </>
                    )}
                </Space>
            </div>
        </HomeHeader>
    )
}
