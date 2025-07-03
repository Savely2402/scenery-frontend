import navigationHeader from '../../../assets/navigationHeader.png'
import avatar from '../../../assets/avatarMan.png'
import Home from '../../../assets/Home.svg?react'
import User from '../../../assets/User.svg?react'
import styles from './navigation.module.scss'
import { Link } from 'react-router'
import { Button } from 'antd'
import { useAuth } from '../../../hooks/useAuth'
import { EditPost } from '../../../features/EditPost'

const navItems = [
    {
        Icon: Home,
        name: 'Home',
        link: '/home',
    },
    {
        Icon: User,
        name: 'Profile',
        link: '/profile',
    },
]

export const Navigation: React.FC = () => {
    const { user } = useAuth()

    return (
        <div className={styles.nav}>
            <img
                src={navigationHeader}
                alt="Navigation photo"
                className={styles['nav__header-img']}
            />


            <div>

                <EditPost
                    visible={true}
                    post={null}
                    onCancel={() => console.log('cancel')}
                    onSave={(updated) => console.log('save', updated)}
                />

            </div>


            <div className={styles.nav__container}>
                <img
                    src={avatar}
                    alt="avatar"
                    className={styles['nav__avatar-img']}
                />

                <div className={styles.nav__info}>
                    <p className={styles['nav__info-name']}>
                        {user && user.username}
                    </p>
                    <p className={styles['nav__info-job']}>Software Engineer</p>
                </div>

                <div className={styles.nav__links}>
                    {navItems.map(({ Icon, link, name }) => (
                        <Link to={link} className={styles.nav__link}>
                            <Button
                                icon={<Icon />}
                                className={styles['nav__link-name']}
                            >
                                {name}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
