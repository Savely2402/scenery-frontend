import { Input, Layout, Space, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { deleteCookie } from '../../../utils/cookies'
import styles from './header.module.scss'
import { Link, useNavigate } from 'react-router'
import { fetchDeleteAuth } from '../../../api/fetchAuth'
//import { Input } from '../../../shared/Input/ui'
import userIcon from '../../../assets/User.svg'
import logoIcon from '../../../assets/logoMark.svg'
import { useAuth } from '../../../hooks/useAuth'

const { Header: HomeHeader } = Layout
const { Text } = Typography

export const Header: React.FC = () => {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()

    const onClickLogout = async () => {
        await fetchDeleteAuth()
        deleteCookie('token')
        deleteCookie('refresh')
        setUser(null)
    }

    const onClickLogin = () => {
        navigate('/login')
    }

    const onClickHome = () => {
        navigate('home')
    }

    const search = () => {}

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
